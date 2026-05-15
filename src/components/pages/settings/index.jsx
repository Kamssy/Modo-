import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { 
  User, 
  Bell, 
  ShieldCheck, 
  Globe, 
  Moon, 
  CreditCard,
  Smartphone,
  Mail,
  Fingerprint,
  Key
} from "lucide-react";

// Custom Toggle Component
const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    className={`relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 ${
      enabled ? "bg-primary" : "bg-ink-10"
    }`}
    onClick={() => onChange(!enabled)}
  >
    <span className="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
        enabled ? "translate-x-[18px]" : "translate-x-0"
      }`}
    />
  </button>
);

const SettingsPage = () => {
  const { darkMode, setDarkMode, currency, setCurrency } = useAppContext();
  const [activeTab, setActiveTab] = useState("preferences");
  
  // Mock states for other toggles
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [biometrics, setBiometrics] = useState(true);

  const tabs = [
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-2">
        <h2 className="font-display text-[26px] text-ink mb-1">Settings</h2>
        <p className="text-[13px] text-ink-40">
          Manage your app preferences and account security.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        {/* Navigation Sidebar */}
        <Card className="p-2 lg:w-64 shrink-0 flex flex-row lg:flex-col overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? "bg-primary-light/10 text-primary font-medium" 
                    : "text-ink-60 hover:bg-ink-05"
                }`}
              >
                <Icon size={18} className={isActive ? "text-primary" : "text-ink-40"} />
                <span className="text-[13.5px]">{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* Preferences Section */}
          {activeTab === "preferences" && (
            <div className="space-y-6 animate-fade-up">
              <Card className="overflow-hidden">
                <div className="px-6 py-5 border-b border-ink-05">
                  <h3 className="font-display text-lg text-ink">General Preferences</h3>
                  <p className="text-[12px] text-ink-40 mt-1">Configure basic app settings</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Currency */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-[14px] font-medium text-ink">Base Currency</h4>
                      <p className="text-[12px] text-ink-40">Main currency for all charts and balances</p>
                    </div>
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                      className="h-10 w-full sm:w-48 rounded-sm border border-ink-10 bg-bg-card px-3 text-[13px] text-ink outline-none focus:border-primary"
                    >
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>

                  <hr className="border-ink-05" />

                  {/* Language */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-[14px] font-medium text-ink">Language</h4>
                      <p className="text-[12px] text-ink-40">Set your preferred interface language</p>
                    </div>
                    <select className="h-10 w-full sm:w-48 rounded-sm border border-ink-10 bg-white px-3 text-[13px] text-ink outline-none focus:border-primary">
                      <option value="en">English (US)</option>
                      <option value="en-gb">English (UK)</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="px-6 py-5 border-b border-ink-05">
                  <h3 className="font-display text-lg text-ink">Appearance</h3>
                  <p className="text-[12px] text-ink-40 mt-1">Customize the look and feel</p>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-ink-05 flex items-center justify-center">
                        <Moon size={18} className="text-ink-60" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-ink">Dark Mode</h4>
                        <p className="text-[12px] text-ink-40">Switch to a darker theme (Coming Soon)</p>
                      </div>
                    </div>
                    <Toggle enabled={darkMode} onChange={setDarkMode} />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Security Section */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-fade-up">
              <Card className="overflow-hidden">
                <div className="px-6 py-5 border-b border-ink-05">
                  <h3 className="font-display text-lg text-ink">Access & Security</h3>
                  <p className="text-[12px] text-ink-40 mt-1">Keep your account safe</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Password */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-ink-05 flex items-center justify-center">
                        <Key size={18} className="text-ink-60" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-ink">Change Password</h4>
                        <p className="text-[12px] text-ink-40">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>

                  <hr className="border-ink-05" />

                  {/* Biometrics */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-ink-05 flex items-center justify-center">
                        <Fingerprint size={18} className="text-ink-60" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-ink">Biometric Login</h4>
                        <p className="text-[12px] text-ink-40">Use Face ID or Fingerprint</p>
                      </div>
                    </div>
                    <Toggle enabled={biometrics} onChange={setBiometrics} />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-fade-up">
              <Card className="overflow-hidden">
                <div className="px-6 py-5 border-b border-ink-05">
                  <h3 className="font-display text-lg text-ink">Notification Preferences</h3>
                  <p className="text-[12px] text-ink-40 mt-1">Choose what you want to hear about</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Push */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-ink-05 flex items-center justify-center">
                        <Smartphone size={18} className="text-ink-60" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-ink">Push Notifications</h4>
                        <p className="text-[12px] text-ink-40">Instant alerts on your device</p>
                      </div>
                    </div>
                    <Toggle enabled={pushNotifs} onChange={setPushNotifs} />
                  </div>

                  <hr className="border-ink-05" />

                  {/* Email */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-ink-05 flex items-center justify-center">
                        <Mail size={18} className="text-ink-60" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-ink">Email Digests</h4>
                        <p className="text-[12px] text-ink-40">Weekly summaries and insights</p>
                      </div>
                    </div>
                    <Toggle enabled={emailNotifs} onChange={setEmailNotifs} />
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
