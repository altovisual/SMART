/**
 * Script to help verify email for testing
 * Note: This requires admin access to Supabase
 * Run with: node scripts/verifyEmail.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ycsqkkupncgzwihmamtu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc3Fra3VwbmNnendpaG1hbXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTYwODgsImV4cCI6MjA3ODUzMjA4OH0.sL5lsjNmk7WhIE9EyMUF90Q_KymcK0tgt7xhCih9LTA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TEST_EMAIL = "testmail@gmail.com";

async function sendVerificationEmail() {
  console.log('📧 Attempting to resend verification email...');
  console.log('Email:', TEST_EMAIL);
  console.log('━'.repeat(50));

  try {
    // Try to resend confirmation email
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: TEST_EMAIL,
    });

    if (error) {
      console.log('❌ Failed to send verification email');
      console.log('   Error:', error.message);
      console.log('\n💡 This is expected - anon key cannot resend emails.');
      console.log('   You need to verify manually in Supabase Dashboard.');
    } else {
      console.log('✅ Verification email sent successfully!');
      console.log('   Check the inbox for:', TEST_EMAIL);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n' + '━'.repeat(50));
  console.log('\n📋 Manual Verification Steps:\n');
  console.log('1. Go to: https://app.supabase.com/project/ycsqkkupncgzwihmamtu');
  console.log('2. Navigate to: Authentication → Users');
  console.log('3. Find user:', TEST_EMAIL);
  console.log('4. Click the 3 dots (⋮) next to the user');
  console.log('5. Select: "Confirm email"');
  console.log('6. Wait 1-2 minutes');
  console.log('7. Try logging in again\n');
}

sendVerificationEmail().catch(console.error);
