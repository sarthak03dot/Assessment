import { useState } from "react";

type Props = {
  onSubmit: (email: string) => void;
};

export default function EmailModal({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] shadow-lg p-6">
        {/* Header */}
        <h3 className="font-semibold text-lg mb-1">
          Continue with Email
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter your email to personalize and save your analytics data.
        </p>

        {/* Input */}
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="you@company.com"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Continue
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-4">
          Your email is used only to save and retrieve analytics settings.
        </p>
      </div>
    </div>
  );
}
