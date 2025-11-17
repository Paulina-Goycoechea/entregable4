import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Play, ArrowLeft, User, Mail, Lock, Bell, Moon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@email.com",
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile logic
    alert("Perfil actualizado correctamente");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Change password logic
    alert("Contraseña cambiada correctamente");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <h1 className="text-xl font-bold">Configuración</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Profile Section */}
        <div className="bg-card rounded-lg p-6 border border-border card-shadow mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-card hover:bg-primary/90 transition-colors">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-muted-foreground">{profileData.email}</p>
            </div>
          </div>

          <Separator className="mb-6" />

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <Button type="submit" className="gradient-primary text-white">
              Guardar Cambios
            </Button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-card rounded-lg p-6 border border-border card-shadow mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Cambiar Contraseña</h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <Button type="submit" variant="outline">
              Actualizar Contraseña
            </Button>
          </form>
        </div>

        {/* Preferences Section */}
        <div className="bg-card rounded-lg p-6 border border-border card-shadow">
          <h3 className="text-xl font-bold mb-6">Preferencias</h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Modo Oscuro</p>
                  <p className="text-sm text-muted-foreground">Usa el tema oscuro en toda la aplicación</p>
                </div>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Notificaciones por Correo</p>
                  <p className="text-sm text-muted-foreground">Recibe actualizaciones sobre tus playlists</p>
                </div>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, emailNotifications: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 p-6 border border-destructive/50 rounded-lg bg-destructive/5">
          <h3 className="text-lg font-bold text-destructive mb-2">Zona de Peligro</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Esta acción es permanente y no se puede deshacer.
          </p>
          <Button variant="destructive">Eliminar Cuenta</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
