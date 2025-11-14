import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "../pages/Auth/ModernAuth2Col";
import MerchantAuth from "../pages/Auth/ModernAuth2Col";
import Dashboard from "../pages/Dashboard/PaymentDashboard";
import MerchantDashboard from "../pages/Dashboard/ModernMerchantDashboard";
import Checkout from "../pages/AppleCheckout";
import PaymentSummary from "../pages/PaymentSummary";
import MainLayout from "../layouts/MainLayout";
import PaymentSourceSelector from "../components/checkout/PaymentSourceSelector";
import CryptoPaymentSourceSelector from "../components/checkout/CryptoPaymentSourceSelector";
import { PublicRoute, UserRoute, MerchantRoute } from "./ProtectedRoute";
import LoadingScreen from "../components/common/LoadingScreenAuth";

// Checkout Flow Components
import CryptoPayment from "../pages/Checkout/CryptoPayment";
import CardPayment from "../pages/Checkout/CardPayment";
import BankPayment from "../pages/Checkout/BankPayment";
import PaymentSuccess from "../pages/Checkout/PaymentSuccess";
import PaymentError from "../pages/Checkout/PaymentError";

export default function AppRouter() {
  const { user, status } = useSelector((state) => state.auth);

  if (status === "loading") return <LoadingScreen message="Signing in......" />;

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute user={user} />}>
        <Route path="/" element={<Auth />} />
        <Route path="/merchant" element={<MerchantAuth />} />
      </Route>

      {/* USER ROUTES */}
      <Route element={<UserRoute user={user} />}>
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />
        <Route
          path="/checkout/crypto"
          element={
            <MainLayout>
              <CryptoPayment />
            </MainLayout>
          }
        />
        <Route
          path="/checkout/card"
          element={
            <MainLayout>
              <CardPayment />
            </MainLayout>
          }
        />
        <Route
          path="/checkout/bank"
          element={
            <MainLayout>
              <BankPayment />
            </MainLayout>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <MainLayout>
              <PaymentSuccess />
            </MainLayout>
          }
        />
        <Route
          path="/checkout/error"
          element={
            <MainLayout>
              <PaymentError />
            </MainLayout>
          }
        />
        <Route
          path="/payment-fiat"
          element={
            <MainLayout>
              <PaymentSourceSelector />
            </MainLayout>
          }
        />
        <Route
          path="/payment-crypto"
          element={
            <MainLayout>
              <CryptoPaymentSourceSelector />
            </MainLayout>
          }
        />
        <Route
          path="/paymentsummary"
          element={
            <MainLayout>
              <PaymentSummary />
            </MainLayout>
          }
        />
      </Route>

      {/* MERCHANT ROUTES */}
      <Route element={<MerchantRoute user={user} />}>
        <Route
          path="/merchant/dashboard"
          element={
            <MainLayout role="merchant">
              <MerchantDashboard />
            </MainLayout>
          }
        />
      </Route>

      {/* Catch-All Route */}
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
}
