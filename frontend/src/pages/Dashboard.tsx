import { useEffect, useState } from "react";
import CallDurationChart from "../components/charts/CallDurationChart";
import SadPathChart from "../components/charts/SadPathChart";
import EmailModal from "../components/EmailModal";
import ConfirmOverwriteModal from "../components/OverwriteConfirmModal";
import { defaultCallDuration } from "../data/dummyData";
import { supabase } from "../api/supabase";

export default function Dashboard() {
  const [data, setData] = useState(defaultCallDuration);
  const [email, setEmail] = useState<string | null>(null);
  const [editableData, setEditableData] = useState(data);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;

    const fetchPreviousData = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("chart_data")
        .select("values")
        .eq("email", email)
        .maybeSingle();

      if (data?.values) {
        setData(data.values);
      }
      setLoading(false);
    };

    fetchPreviousData();
  }, [email]);

  const handleEdit = () => {
    if (!email) {
      setShowEmailModal(true);
      return;
    }
    setEditableData([...data]);
    setShowConfirm(true);
  };
  const saveData = async () => {
    setData(editableData);

    await supabase.from("chart_data").upsert(
      {
        email,
        values: editableData,
      },
      { onConflict: "email" }
    );

    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className=" mx-auto px-10 py-10">
          <h1 className="text-3xl font-bold">
            Voice Agent Analytics Dashboard
          </h1>
          <p className="text-blue-100 mt-2 max-w-xl">
            Gain insights into call performance, user behavior, and conversation
            quality using real-time analytics.
          </p>
        </div>
      </div>

      <div className="p-10  mx-auto space-y-10">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Calls", value: "1,248" },
            { label: "Avg Call Duration", value: "3m 42s" },
            { label: "Escalation Rate", value: "12%" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="text-2xl font-bold mt-2">{kpi.value}</p>
            </div>
          ))}
        </div>

        {loading && (
          <p className="text-sm text-blue-600">
            Fetching your previously saved analytics…
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <CallDurationChart data={data} />
          <SadPathChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">
              Customize Call Duration Analytics
            </h3>
            <p className="text-sm text-gray-500">
              Modify and persist call duration metrics for your email.
            </p>
            {email && (
              <p className="text-xs text-gray-400 mt-1">
                Logged in as: {email}
              </p>
            )}
          </div>

          <button
            onClick={handleEdit}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg shadow transition"
          >
            Modify Data
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Analytics data is securely stored and associated with your email.
        </p>
      </div>

      {showEmailModal && (
        <EmailModal
          onSubmit={(e) => {
            setEmail(e);
            setShowEmailModal(false);
          }}
        />
      )}

      {showConfirm && (
        <ConfirmOverwriteModal
          editableData={editableData}
          setEditableData={setEditableData}
          onConfirm={saveData}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
