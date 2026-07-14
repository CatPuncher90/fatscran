import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT and extract user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const jwt = authHeader.replace('Bearer ', '');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Validate the JWT and get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = user.id;

    // Delete avatar from storage (ignore if not found)
    const { data: avatarFiles } = await supabase.storage
      .from('avatars')
      .list(userId);
    if (avatarFiles?.length) {
      const paths = avatarFiles.map((f: { name: string }) => `${userId}/${f.name}`);
      await supabase.storage.from('avatars').remove(paths);
    }

    // Delete user rows from all tables
    const { error: favsError } = await supabase
      .from('favourites')
      .delete()
      .eq('user_id', userId);
    if (favsError) throw favsError;

    const { error: listError } = await supabase
      .from('shopping_list')
      .delete()
      .eq('user_id', userId);
    if (listError) throw listError;

    const { error: plansError } = await supabase
      .from('meal_plans')
      .delete()
      .eq('user_id', userId);
    if (plansError) throw plansError;

    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (profileError) throw profileError;

    // Delete the auth user
    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(userId);
    if (deleteUserError) throw deleteUserError;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('delete-account error:', err);
    return new Response(JSON.stringify({ error: 'Deletion failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
