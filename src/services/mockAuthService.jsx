/**
 * Mock Auth Service for Development
 * This bypasses Supabase authentication for local testing
 */

// Mock user data
const MOCK_USERS = {
  'user@test.com': {
    id: 'mock-user-id-001',
    email: 'user@test.com',
    user_metadata: {
      name: 'Test User',
      role: 'user',
    },
    email_confirmed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  'merchant@test.com': {
    id: 'mock-merchant-id-001',
    email: 'merchant@test.com',
    user_metadata: {
      name: 'Test Merchant',
      role: 'merchant',
    },
    email_confirmed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  'testmail@gmail.com': {
    id: 'mock-testmail-id-001',
    email: 'testmail@gmail.com',
    user_metadata: {
      name: 'Test Mail User',
      role: 'merchant',
    },
    email_confirmed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
};

// Mock passwords (in real app, never store passwords like this!)
const MOCK_PASSWORDS = {
  'user@test.com': 'password',
  'merchant@test.com': 'password',
  'testmail@gmail.com': 'testpassword@@',
};

// Mock login function
export const loginUser = async (email, password, role) => {
  console.log('🎭 MOCK MODE: Using mock authentication');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if user exists
  const user = MOCK_USERS[email];
  
  if (!user) {
    throw new Error('Invalid login credentials');
  }

  // Check password
  if (MOCK_PASSWORDS[email] !== password) {
    throw new Error('Invalid login credentials');
  }

  // Check role
  if (user.user_metadata.role !== role) {
    throw new Error(`This page is for ${role}s. Try logging in as a ${user.user_metadata.role}.`);
  }

  console.log('✅ MOCK LOGIN SUCCESS:', email);
  return user;
};

// Mock signup function
export const signupUser = async (email, username, role, password) => {
  console.log('🎭 MOCK MODE: Using mock signup');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if user already exists
  if (MOCK_USERS[email]) {
    throw new Error('User already registered');
  }

  // Create new mock user
  const newUser = {
    id: `mock-${Date.now()}`,
    email,
    user_metadata: {
      name: username,
      role,
    },
    email_confirmed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  // Store in mock database
  MOCK_USERS[email] = newUser;
  MOCK_PASSWORDS[email] = password;

  console.log('✅ MOCK SIGNUP SUCCESS:', email);
  return newUser;
};

// Export mock users for testing
export const getMockUsers = () => {
  return Object.keys(MOCK_USERS).map(email => ({
    email,
    password: MOCK_PASSWORDS[email],
    role: MOCK_USERS[email].user_metadata.role,
  }));
};
