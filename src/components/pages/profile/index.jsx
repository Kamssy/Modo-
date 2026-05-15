import { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  ChevronRight,
  Camera,
  LogOut,
  Save,
  X
} from "lucide-react";
import { useTransactions } from "../../../context/TransactionContext";
import { useAppContext } from "../../../context/AppContext";

const ProfilePage = () => {
  const { totalBalance, monthlyIncome, monthlySpend } = useTransactions();
  const { profile, updateProfile, currency } = useAppContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const formatCurrency = (val) => {
    const amount = val || 0;
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const menuItems = [
    { icon: CreditCard, label: "Payment Methods", desc: "Manage your linked cards and banks", color: "text-primary" },
    { icon: Bell, label: "Notifications", desc: "Manage your alerts and updates", color: "text-warn" },
    { icon: ShieldCheck, label: "Security", desc: "Password, Biometrics, and Privacy", color: "text-income" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Profile Header */}
      <Card className="p-8 lg:p-10 text-center relative overflow-hidden animate-fade-up">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-light rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-secondary-light rounded-full opacity-50" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary-mid flex items-center justify-center font-display text-4xl text-secondary border-4 border-white dark:border-ink shadow-elevated">
              {profile.avatar}
            </div>
            <button className="absolute bottom-1 right-1 w-8 h-8 bg-bg-card rounded-full flex items-center justify-center shadow-md border border-ink-10 text-primary hover:text-primary-deep transition-colors cursor-pointer">
              <Camera size={16} />
            </button>
          </div>
          
          {isEditing ? (
            <div className="flex flex-col items-center gap-3 w-full max-w-xs mb-6">
              <input 
                type="text" 
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value, avatar: e.target.value.charAt(0).toUpperCase()})}
                className="w-full text-center h-10 rounded-sm border border-ink-10 bg-bg-card px-3 text-[15px] font-display text-ink outline-none focus:border-primary"
                placeholder="Full Name"
              />
              <input 
                type="email" 
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                className="w-full text-center h-10 rounded-sm border border-ink-10 bg-bg-card px-3 text-[13px] text-ink outline-none focus:border-primary"
                placeholder="Email Address"
              />
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl text-ink">{profile.name}</h2>
              <p className="text-sm text-ink-40 mb-6 font-medium">{profile.plan} since May 2024</p>
            </>
          )}
          
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} className="px-5 bg-income hover:bg-income/90 border-none text-white gap-2">
                  <Save size={16} /> Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setIsEditing(false); setEditForm(profile); }}>
                  <X size={16} /> Cancel
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" className="px-5" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                <Button size="sm" variant="ghost" className="text-expense hover:bg-expense/5">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Summary - DYNAMIC */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-1">Available Balance</p>
          <div className="text-xl font-display text-ink">{formatCurrency(totalBalance)}</div>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-1">Total Income</p>
          <div className="text-xl font-display text-income">{formatCurrency(monthlyIncome)}</div>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-1">Total Spent</p>
          <div className="text-xl font-display text-expense">{formatCurrency(monthlySpend)}</div>
        </Card>
      </div>

      {/* Personal Information */}
      <Card className="p-6 lg:p-8 animate-fade-up">
        <h3 className="font-display text-xl text-ink mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-ink-05 flex items-center justify-center text-ink-40">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40">Email Address</p>
              <p className="text-[15px] font-medium text-ink">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-ink-05 flex items-center justify-center text-ink-40">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40">Phone Number</p>
              <p className="text-[15px] font-medium text-ink">+234 812 345 6789</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-ink-05 flex items-center justify-center text-ink-40">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40">Location</p>
              <p className="text-[15px] font-medium text-ink">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Settings List */}
      <Card className="p-2 animate-fade-up">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className={`w-full flex items-center gap-4 p-4 rounded-sm hover:bg-ink-05 transition-colors text-left group cursor-pointer ${index !== menuItems.length - 1 ? 'border-b border-ink-05' : ''}`}
          >
            <div className={`w-10 h-10 rounded-sm bg-white border border-ink-10 flex items-center justify-center ${item.color} group-hover:border-primary transition-colors`}>
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-[15px] font-semibold text-ink">{item.label}</h4>
              <p className="text-xs text-ink-40">{item.desc}</p>
            </div>
            <ChevronRight size={16} className="text-ink-20 group-hover:text-primary transition-colors" />
          </button>
        ))}
      </Card>
    </div>
  );
};

export default ProfilePage;
