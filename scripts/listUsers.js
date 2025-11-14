/**
 * Script to list existing users from Supabase
 * Run with: node scripts/listUsers.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ycsqkkupncgzwihmamtu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc3Fra3VwbmNnendpaG1hbXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTYwODgsImV4cCI6MjA3ODUzMjA4OH0.sL5lsjNmk7WhIE9EyMUF90Q_KymcK0tgt7xhCih9LTA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listUsers() {
  try {
    console.log('📋 Fetching users from database...\n');
    
    // Query the users table (not auth.users, as that requires admin privileges)
    const { data, error } = await supabase
      .from('users')
      .select('email, name, role, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('❌ Error fetching users:', error.message);
      console.log('\n💡 Note: This script can only access the public "users" table.');
      console.log('   To see all auth users, access the Supabase Dashboard directly.');
      return;
    }

    if (!data || data.length === 0) {
      console.log('⚠️  No users found in the database.');
      console.log('\n💡 Suggestions:');
      console.log('   1. Check the Supabase Dashboard: Authentication > Users');
      console.log('   2. Create a test user through the app signup form');
      return;
    }

    console.log(`✅ Found ${data.length} user(s):\n`);
    
    data.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Name: ${user.name || 'N/A'}`);
      console.log(`   Role: ${user.role || 'N/A'}`);
      console.log(`   Created: ${new Date(user.created_at).toLocaleDateString()}`);
      console.log('');
    });

    console.log('\n📝 Test Credentials:');
    console.log('   Email: [use one of the emails above]');
    console.log('   Password: [you need to know the password used during signup]');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
listUsers();
