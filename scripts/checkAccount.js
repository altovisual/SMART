/**
 * Script to check a specific account in Supabase
 * Run with: node scripts/checkAccount.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ycsqkkupncgzwihmamtu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc3Fra3VwbmNnendpaG1hbXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTYwODgsImV4cCI6MjA3ODUzMjA4OH0.sL5lsjNmk7WhIE9EyMUF90Q_KymcK0tgt7xhCih9LTA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Account to check
const TEST_EMAIL = "testmail@gmail.com";
const TEST_PASSWORD = "testpassword@@";

async function checkAccount() {
  console.log('🔍 Checking account:', TEST_EMAIL);
  console.log('━'.repeat(50));

  // Step 1: Check if user exists in users table
  console.log('\n📋 Step 1: Checking users table...');
  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', TEST_EMAIL)
      .single();

    if (userError) {
      console.log('❌ User NOT found in users table');
      console.log('   Error:', userError.message);
      console.log('\n💡 This account may not exist or was not properly created.');
    } else {
      console.log('✅ User found in users table:');
      console.log('   Name:', userData.name);
      console.log('   Email:', userData.email);
      console.log('   Role:', userData.role);
      console.log('   Auth ID:', userData.auth_id);
      console.log('   Created:', new Date(userData.created_at).toLocaleString());
    }
  } catch (error) {
    console.log('❌ Error checking users table:', error.message);
  }

  // Step 2: Try to login
  console.log('\n🔐 Step 2: Attempting login...');
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (authError) {
      console.log('❌ Login FAILED');
      console.log('   Error:', authError.message);
      
      // Provide specific guidance based on error
      if (authError.message.includes('Invalid login credentials')) {
        console.log('\n💡 Possible causes:');
        console.log('   1. Password is incorrect');
        console.log('   2. Email is incorrect or has typos');
        console.log('   3. Account does not exist in Supabase Auth');
      } else if (authError.message.includes('Email not confirmed')) {
        console.log('\n💡 Solution:');
        console.log('   - Check email inbox for verification link');
        console.log('   - Or verify manually in Supabase Dashboard');
      }
    } else {
      console.log('✅ Login SUCCESSFUL!');
      console.log('   User ID:', authData.user.id);
      console.log('   Email:', authData.user.email);
      console.log('   Email Confirmed:', authData.user.email_confirmed_at ? '✅ YES' : '❌ NO');
      console.log('   Role (metadata):', authData.user.user_metadata?.role || 'Not set');
      
      if (!authData.user.email_confirmed_at) {
        console.log('\n⚠️  WARNING: Email is NOT confirmed!');
        console.log('   This will cause login to fail in the app.');
        console.log('   Please verify the email first.');
      }

      // Sign out after test
      await supabase.auth.signOut();
    }
  } catch (error) {
    console.log('❌ Unexpected error during login:', error.message);
  }

  console.log('\n' + '━'.repeat(50));
  console.log('✅ Account check complete!\n');
}

// Run the script
checkAccount().catch(console.error);
