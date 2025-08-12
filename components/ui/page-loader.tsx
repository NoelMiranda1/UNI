
interface PageLoaderProps {
  title?: string;
  message?: string;
}

export function PageLoader({ 
  title = 'Cargando...', 
  message = 'Por favor espere mientras cargamos la información' 
}: PageLoaderProps) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-sm mx-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200" />
          <div className="absolute inset-0 animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
        </div>
        <p className="mt-6 text-gray-700 font-medium text-center">{message}</p>
        <div className="mt-4 flex gap-1">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}