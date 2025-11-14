/**
 * Script to create a test account and check if it works
 * Run with: node scripts/createTestAccount.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ycsqkkupncgzwihmamtu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc3Fra3VwbmNnendpaG1hbXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTYwODgsImV4cCI6MjA3ODUzMjA4OH0.sL5lsjNmk7WhIE9EyMUF90Q_KymcK0tgt7xhCih9LTA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate unique email with timestamp
const timestamp = Date.now();
const TEST_EMAIL = `testuser${timestamp}@example.com`;
const TEST_PASSWORD = "Test123!@#";
const TEST_NAME = "Test User";
const TEST_ROLE = "merchant"; // Change to "user" if needed

async function createAccount() {
  console.log('🔧 Creating Test Account');
  console.log('━'.repeat(60));
  console.log('Email:', TEST_EMAIL);
  console.log('Password:', TEST_PASSWORD);
  console.log('Role:', TEST_ROLE);
  console.log('━'.repeat(60));

  try {
    console.log('\n📝 Step 1: Creating account in Supabase Auth...\n');
    
    const { data, error } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      options: {
        data: {
          name: TEST_NAME,
          role: TEST_ROLE,
        },
      },
    });

    if (error) {
      console.log('❌ SIGNUP FAILED\n');
      console.log('Error:', error.message);
      
      if (error.message.includes('rate limit')) {
        console.log('\n⏰ Rate limit is still active.');
        console.log('   Please wait 10-15 minutes and try again.');
      } else if (error.message.includes('User already registered')) {
        console.log('\n💡 This email is already registered.');
        console.log('   Try logging in instead or use a different email.');
      }
      
      return;
    }

    console.log('✅ Account created successfully!\n');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);
    console.log('Email Confirmed:', data.user.email_confirmed_at ? '✅ YES' : '❌ NO');
    
    // Step 2: Insert into users table
    console.log('\n📝 Step 2: Adding user to users table...\n');
    
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          auth_id: data.user.id,
          name: TEST_NAME,
          email: TEST_EMAIL,
          role: TEST_ROLE,
          password: TEST_PASSWORD,
        },
      ]);

    if (insertError) {
      console.log('⚠️  Warning: Could not insert into users table');
      console.log('   Error:', insertError.message);
      console.log('   The account was created but may have issues in the app.');
    } else {
      console.log('✅ User added to users table successfully!');
    }

    // Step 3: Check email confirmation status
    console.log('\n' + '━'.repeat(60));
    console.log('\n📋 ACCOUNT CREATED - NEXT STEPS:\n');
    
    if (!data.user.email_confirmed_at) {
      console.log('⚠️  Email is NOT confirmed yet.\n');
      console.log('To login, you need to either:\n');
      console.log('Option A: Check email inbox');
      console.log('  1. Go to:', TEST_EMAIL);
      console.log('  2. Look for Supabase confirmation email');
      console.log('  3. Click the verification link');
      console.log('  4. Wait 1-2 minutes');
      console.log('  5. Try logging in\n');
      
      console.log('Option B: Verify manually in Supabase Dashboard');
      console.log('  1. Go to: https://app.supabase.com/project/ycsqkkupncgzwihmamtu');
      console.log('  2. Navigate to: Authentication → Users');
      console.log('  3. Find:', TEST_EMAIL);
      console.log('  4. Click 3 dots (⋮) → "Confirm email"');
      console.log('  5. Try logging in\n');
      
      console.log('Option C: Ask for access to Supabase Dashboard');
      console.log('  - Request admin access to verify emails yourself\n');
    } else {
      console.log('✅ Email is already confirmed! You can login now.\n');
    }
    
    console.log('━'.repeat(60));
    console.log('\n💾 SAVE THESE CREDENTIALS:\n');
    console.log('Email:', TEST_EMAIL);
    console.log('Password:', TEST_PASSWORD);
    console.log('Role:', TEST_ROLE);
    console.log('Login URL:', TEST_ROLE === 'merchant' ? 'http://localhost:3000/merchant' : 'http://localhost:3000/');
    console.log('\n');

  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
}

createAccount().catch(console.error);
