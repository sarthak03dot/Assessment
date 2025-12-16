type ChartValue = {
    name: string;
    value: number;
};

type Props = {
    editableData: ChartValue[];
    setEditableData: React.Dispatch<React.SetStateAction<ChartValue[]>>;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmOverwriteModal({
    editableData,
    setEditableData,
    onConfirm,
    onCancel,
}: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[460px] shadow-xl">
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h3 className="font-semibold text-lg">
                        Edit & Overwrite Analytics
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Update the existing call duration values before saving.
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-4 space-y-3">
                    <div className="grid grid-cols-3 text-xs text-gray-400 mb-1">
                        <span>Day</span>
                        <span className="col-span-2 text-right">Duration</span>
                    </div>

                    {editableData.map((item, index) => (
                        <div
                            key={item.name}
                            className="grid grid-cols-3 items-center gap-3"
                        >
                            <span className="text-sm text-gray-600">
                                {item.name}
                            </span>

                            <input
                                type="number"
                                min={0}
                                className="col-span-2 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={item.value}
                                onChange={(e) => {
                                    const updated = editableData.map((d, i) =>
                                        i === index
                                            ? { ...d, value: Number(e.target.value) }
                                            : d
                                    );
                                    setEditableData(updated);
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="border-t px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        Save & Overwrite
                    </button>
                </div>
            </div>
        </div>
    );
}
