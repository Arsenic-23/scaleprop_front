import React from "react";
import InfoPage from "../../components/InfoPage";

const KnowledgeBase: React.FC = () => {
  return (
    <InfoPage headerTitle="Knowledge Base" backLabel="Support">

      {/* Getting Started */}
      <section className="flex flex-col gap-3 rounded-xl bg-ios-bg-secondary p-4">
        <h2 className="text-lg font-semibold text-ios-label">Getting Started</h2>

        <ul className="text-sm text-ios-label-secondary space-y-3">

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Account Creation</p>
            <p className="mt-1">
              To sign up on Scalefund, you only need a valid email address. After a quick email
              verification, you are immediately redirected to the home page where you can begin
              exploring challenges and account options.
            </p>
          </li>

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Choosing a Challenge</p>
            <p className="mt-1">
              Browse various challenge types based on your skill and preference. Review key
              details like max drawdown, profit targets, daily loss limits, and trading conditions
              before purchasing.
            </p>
          </li>

        </ul>
      </section>

      {/* Payments & Transactions */}
      <section className="flex flex-col gap-3 rounded-xl bg-ios-bg-secondary p-4">
        <h2 className="text-lg font-semibold text-ios-label">Payments & Crypto Handling</h2>

        <ul className="text-sm text-ios-label-secondary space-y-3">

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Crypto-Only Payment System</p>
            <p className="mt-1">
              Scalefund operates strictly on cryptocurrency for every transaction — purchasing
              challenges, renewals, and payouts. This ensures faster, safer global payments, strong
              data privacy, and full compliance with international policies.
            </p>
          </li>

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Buying a Challenge</p>
            <p className="mt-1">
              After choosing a challenge, you will receive a unique crypto payment address. Once you
              complete the transaction, our system verifies your payment both on the website and via
              email in real-time.
            </p>
          </li>

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Verification of Crypto Payments</p>
            <p className="mt-1">
              Payments typically confirm within a few minutes depending on the blockchain network.
              Once confirmed, your challenge is activated and the login details for your cTrader
              account are generated instantly.
            </p>
          </li>

        </ul>
      </section>

      {/* Trading Accounts */}
      <section className="flex flex-col gap-3 rounded-xl bg-ios-bg-secondary p-4">
        <h2 className="text-lg font-semibold text-ios-label">Trading Accounts</h2>

        <ul className="text-sm text-ios-label-secondary space-y-3">

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Receiving Your cTrader Credentials</p>
            <p className="mt-1">
              As soon as your crypto transaction is verified, your cTrader Login ID & Password are
              sent to your email and displayed in your account dashboard on the Scalefund app.
            </p>
          </li>

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Linking Your Trading Account</p>
            <p className="mt-1">
              Scalefund connects directly with cTrader, allowing you to monitor your PnL, closed
              trades, open positions, drawdown, and overall performance live from your app
              dashboard.
            </p>
          </li>

          <li>
            <p className="text-ios-label font-medium">Dashboard Monitoring</p>
            <p className="mt-1">
              Your real-time statistics — including profit, loss, drawdown limits, equity charts,
              and trade history — update automatically as cTrader sends your data to the platform.
            </p>
          </li>

        </ul>
      </section>

      {/* Security & Policies */}
      <section className="flex flex-col gap-3 rounded-xl bg-ios-bg-secondary p-4 mb-4">
        <h2 className="text-lg font-semibold text-ios-label">Security, Safety & Policies</h2>

        <ul className="text-sm text-ios-label-secondary space-y-3">

          <li className="border-b border-ios-separator pb-3">
            <p className="text-ios-label font-medium">Data Protection</p>
            <p className="mt-1">
              Scalefund ensures complete data privacy by using end-to-end encryption and storing no
              sensitive financial information. Our crypto-only payment model eliminates banking
              risks and ensures zero data leakage.
            </p>
          </li>

          <li>
            <p className="text-ios-label font-medium">Government & Regulatory Compliance</p>
            <p className="mt-1">
              To comply with global regulations, Scalefund strictly avoids storing user banking
              details. All transactions are crypto-based to ensure maximum safety and transparency.
            </p>
          </li>

        </ul>
      </section>

    </InfoPage>
  );
};

export default KnowledgeBase;
