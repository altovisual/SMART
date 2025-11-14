import {
  FETCH_DASHBOARD_PENDING,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
} from "./dashboardTypes";
import { supabase } from "../../supabaseClient";

// 🎭 MOCK MODE: Check if using mock authentication
const USE_MOCK_DATA = true; // Set to false to use real Supabase data

const getMockDashboardData = (userEmail) => ({
  user: {
    id: 'mock-user-id',
    email: userEmail,
    name: 'Test User',
    role: 'merchant',
    created_at: new Date().toISOString()
  },
  cryptos: [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 45000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3000 },
    { id: 3, name: 'USDC', symbol: 'USDC', price: 1 }
  ],
  purchaseHistory: [
    {
      id: 1,
      user_email: userEmail,
      merchant_name: 'Tech Store',
      item: 'Laptop',
      amount_paid: 1299.99,
      payment_method: 'Crypto',
      status: 'Completed',
      points: 65,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: 2,
      user_email: userEmail,
      merchant_name: 'Coffee Shop',
      item: 'Premium Coffee',
      amount_paid: 25.50,
      payment_method: 'Via Credit Card',
      status: 'Completed',
      points: 1,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
      id: 3,
      user_email: userEmail,
      merchant_name: 'Online Store',
      item: 'Headphones',
      amount_paid: 199.99,
      payment_method: 'Bank',
      status: 'Completed',
      points: 10,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
      id: 4,
      user_email: userEmail,
      merchant_name: 'Game Store',
      item: 'Video Game',
      amount_paid: 59.99,
      payment_method: 'Crypto',
      status: 'Failed',
      points: 0,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
    }
  ],
  rewardHistory: [
    {
      id: 1,
      user_email: userEmail,
      reward_amount: 65,
      reward_type: 'Purchase',
      description: 'Laptop purchase reward',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      user_email: userEmail,
      reward_amount: 10,
      reward_type: 'Purchase',
      description: 'Headphones purchase reward',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      user_email: userEmail,
      reward_amount: 50,
      reward_type: 'Bonus',
      description: 'Sign-up bonus',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
});

export const fetchDashboardData = (userEmail) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_PENDING });

    try {
      // Use mock data if enabled
      if (USE_MOCK_DATA) {
        console.warn('⚠️ MOCK MODE: Using mock dashboard data');
        const mockData = getMockDashboardData(userEmail);
        
        dispatch({
          type: FETCH_DASHBOARD_SUCCESS,
          payload: mockData
        });
        return;
      }

      // Real Supabase data
      const [userRes, cryptosRes, purchasesRes, rewardsRes] = await Promise.all(
        [
          supabase.from("users").select("*").eq("email", userEmail).maybeSingle(),
          supabase.from("cryptos").select("*"),
          supabase
            .from("purchase_history")
            .select("*")
            .eq("user_email", userEmail),
          supabase
            .from("reward_history")
            .select("*")
            .eq("user_email", userEmail),
        ]
      );

      if (
        userRes.error ||
        cryptosRes.error ||
        purchasesRes.error ||
        rewardsRes.error
      ) {
        throw new Error(
          userRes.error?.message ||
            cryptosRes.error?.message ||
            purchasesRes.error?.message ||
            rewardsRes.error?.message
        );
      }

      dispatch({
        type: FETCH_DASHBOARD_SUCCESS,
        payload: {
          user: userRes.data,
          cryptos: cryptosRes.data,
          purchaseHistory: purchasesRes.data,
          rewardHistory: rewardsRes.data,
        },
      });
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      dispatch({ type: FETCH_DASHBOARD_FAILURE, payload: error.message });
    }
  };
};
