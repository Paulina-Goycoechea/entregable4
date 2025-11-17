import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Eye, EyeOff, Check, X } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"];
  const strengthColors = ["bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-green-600"];

  const passwordRequirements = [
    { label: "Al menos 8 caracteres", met: formData.password.length >= 8 },
    { label: "Mayúsculas y minúsculas", met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
    { label: "Al menos un número", met: /\d/.test(formData.password) },
    { label: "Caracteres especiales", met: /[^a-zA-Z0-9]/.test(formData.password) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    navigate("/playlist");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-6 h-6 fill-white" />
            </div>
            <h1 className="text-3xl font-bold">MiPlaylist</h1>
          </div>
          <h2 className="text-4xl font-bold mb-4">Comienza tu experiencia</h2>
          <p className="text-lg text-white/90 mb-6">
            Únete a miles de usuarios que ya organizan sus videos favoritos con nosotros.
          </p>
          <div className="space-y-4 text-white/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <p>Playlists ilimitadas</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <p>Sincronización en la nube</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <p>Disponible en todos tus dispositivos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Play className="w-5 h-5 fill-white" />
            </div>
            <h1 className="text-2xl font-bold">MiPlaylist</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Crear cuenta</h2>
            <p className="text-muted-foreground">Completa tus datos para comenzar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="tu_usuario"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Crea una contraseña segura"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-input border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fortaleza:</span>
                    <span className="font-medium">{strengthLabels[passwordStrength]}</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < passwordStrength ? strengthColors[passwordStrength] : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="space-y-1 mt-3">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {req.met ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <X className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className={req.met ? "text-green-500" : "text-muted-foreground"}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="bg-input border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" required className="mt-1 rounded border-border" />
              <span className="text-sm text-muted-foreground">
                Acepto los{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Términos y Condiciones
                </Link>{" "}
                y la{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
              </span>
            </div>

            <Button type="submit" className="w-full gradient-primary text-white font-semibold h-12 hover:opacity-90">
              Crear Cuenta
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
