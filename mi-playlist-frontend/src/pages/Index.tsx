import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Video, Heart, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center glow-effect">
              <Play className="w-8 h-8 fill-white" />
            </div>
            <h1 className="text-5xl font-bold">MiPlaylist</h1>
          </div>

          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tus videos, organizados como nunca
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Gestiona, descubre y disfruta tus playlists de video favoritas en un solo lugar. 
            La forma más elegante de organizar tu contenido.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => navigate("/register")}
              className="gradient-primary text-white font-semibold h-14 px-8 text-lg hover:opacity-90 glow-effect"
            >
              Comenzar Gratis
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="h-14 px-8 text-lg border-border hover:bg-card"
            >
              Iniciar Sesión
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border card-shadow">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Playlists Ilimitadas</h3>
              <p className="text-muted-foreground">
                Crea y organiza tantas playlists como desees sin restricciones
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border card-shadow">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gestión Inteligente</h3>
              <p className="text-muted-foreground">
                Marca favoritos, da likes y organiza tus videos fácilmente
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border card-shadow">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interfaz Elegante</h3>
              <p className="text-muted-foreground">
                Diseño moderno y minimalista para la mejor experiencia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
