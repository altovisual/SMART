/**
 * Script to test login with different credentials
 * Run with: node scripts/testLogin.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ycsqkkupncgzwihmamtu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc3Fra3VwbmNnendpaG1hbXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTYwODgsImV4cCI6MjA3ODUzMjA4OH0.sL5lsjNmk7WhIE9EyMUF90Q_KymcK0tgt7xhCih9LTA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test credentials
const TEST_EMAIL = "testmail@gmail.com";
const TEST_PASSWORD = "testpassword@@";

async function testLogin() {
  console.log('🔐 Testing Login Credentials');
  console.log('━'.repeat(60));
  console.log('Email:', TEST_EMAIL);
  console.log('Password:', TEST_PASSWORD);
  console.log('━'.repeat(60));

  try {
    console.log('\n📝 Attempting login...\n');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (error) {
      console.log('❌ LOGIN FAILED\n');
      console.log('Error Code:', error.status);
      console.log('Error Message:', error.message);
      console.log('\n' + '━'.repeat(60));
      
      // Provide specific guidance
      if (error.message.includes('Invalid login credentials')) {
        console.log('\n🔍 DIAGNOSIS: Invalid Credentials\n');
        console.log('Possible causes:');
        console.log('  1. ❌ Email is incorrect or has typos');
        console.log('  2. ❌ Password is incorrect');
        console.log('  3. ❌ Account does not exist in Supabase');
        console.log('  4. ❌ Account was deleted');
        console.log('\n💡 SOLUTIONS:\n');
        console.log('  A. Verify credentials with the person who provided them');
        console.log('  B. Check Supabase Dashboard → Authentication → Users');
        console.log('  C. Try creating a new test account');
        console.log('\n📋 To check if account exists:');
        console.log('  - Go to: https://app.supabase.com/project/ycsqkkupncgzwihmamtu');
        console.log('  - Navigate to: Authentication → Users');
        console.log('  - Search for:', TEST_EMAIL);
        
      } else if (error.message.includes('Email not confirmed')) {
        console.log('\n🔍 DIAGNOSIS: Email Not Verified\n');
        console.log('💡 SOLUTION: Verify email in Supabase Dashboard');
        
      } else {
        console.log('\n🔍 DIAGNOSIS: Unknown Error\n');
        console.log('💡 Check Supabase status: https://status.supabase.com/');
      }
      
    } else {
      console.log('✅ LOGIN SUCCESSFUL!\n');
      console.log('User Details:');
      console.log('  ID:', data.user.id);
      console.log('  Email:', data.user.email);
      console.log('  Email Confirmed:', data.user.email_confirmed_at ? '✅ YES' : '❌ NO');
      console.log('  Role:', data.user.user_metadata?.role || 'Not set');
      console.log('  Created:', new Date(data.user.created_at).toLocaleString());
      
      console.log('\n' + '━'.repeat(60));
      console.log('✅ These credentials are VALID!');
      console.log('You can use them to login in the app.');
      
      // Check if user exists in users table
      console.log('\n📋 Checking users table...');
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', TEST_EMAIL)
        .single();
        
      if (userError) {
        console.log('⚠️  User NOT found in users table');
        console.log('   This might cause issues in the app.');
      } else {
        console.log('✅ User found in users table');
        console.log('   Name:', userData.name);
        console.log('   Role:', userData.role);
      }
      
      // Sign out
      await supabase.auth.signOut();
    }
    
  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
  
  console.log('\n' + '━'.repeat(60));
  console.log('Test complete!\n');
}

testLogin().catch(console.error);
