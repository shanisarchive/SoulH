import React, { useState } from 'react';
import { Watch, Bluetooth, Check, X, RefreshCw } from 'lucide-react';
import { useSmartWatch } from '../../hooks/useSmartWatch';

const SmartWatchConnect: React.FC = () => {
  const { device, connecting, error, connectDevice } = useSmartWatch();
  const [selectedType, setSelectedType] = useState<'APPLE' | 'FITBIT' | 'GARMIN' | 'SAMSUNG' | null>(null);

  const handleConnect = async () => {
    if (!selectedType) return;
    await connectDevice(selectedType);
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Watch className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Connect Smart Watch</h3>
        </div>
        {device?.connected && (
          <div className="flex items-center space-x-2 text-green-500">
            <Check className="h-5 w-5" />
            <span>Connected</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {!device?.connected && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { type: 'APPLE', label: 'Apple Watch' },
              { type: 'FITBIT', label: 'Fitbit' },
              { type: 'GARMIN', label: 'Garmin' },
              { type: 'SAMSUNG', label: 'Samsung Watch' }
            ].map((watch) => (
              <button
                key={watch.type}
                onClick={() => setSelectedType(watch.type as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedType === watch.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Watch className="h-5 w-5" />
                  <span>{watch.label}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleConnect}
            disabled={!selectedType || connecting}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
              connecting
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {connecting ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Bluetooth className="h-5 w-5" />
                <span>Connect Device</span>
              </>
            )}
          </button>
        </>
      )}

      {device?.connected && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{device.name}</p>
              <p className="text-sm text-gray-500">{device.type}</p>
            </div>
            <button
              onClick={() => {/* Implement disconnect */}}
              className="text-red-500 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Your health metrics are being synchronized in real-time.
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartWatchConnect;