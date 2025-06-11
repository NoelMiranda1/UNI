import { api } from './api';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Enhanced rate limiting with queue
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 3000; // Increased to 3 seconds minimum between requests
let requestQueue: Array<() => void> = [];
let isProcessingQueue = false;

// Request queue processor
const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (requestQueue.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
    }
    
    const nextRequest = requestQueue.shift();
    if (nextRequest) {
      lastRequestTime = Date.now();
      nextRequest();
    }
  }
  
  isProcessingQueue = false;
};

export const chatService = {
  async sendMessage(messages: Message[]): Promise<Message> {
    return new Promise((resolve, reject) => {
      const executeRequest = async () => {
        try {
          const response = await api.post('/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `Eres un incleible soporte de la UNI, el asistente virtual oficial de la Universidad Nacional de Ingeniería de Nicaragua.

INFORMACIÓN GENERAL:
- Fundada: 7 de febrero de 1983
- Ubicación: Sede Central, Avenida Universitaria, Managua, Nicaragua
- Teléfonos: (505) 2267-0275 / 77
- Sitio web: www.uni.edu.ni

CARRERAS DISPONIBLES:
1. Ingeniería en Computación
2. Arquitectura
3. Ingeniería Electrónica
4. Ingeniería Mecánica
5. Ingeniería Industrial
6. Ingeniería Civil
7. Ingeniería Química
8. Ingeniería en Sistemas
9. Ingeniería en Telecomunicaciones
10. Ingeniería Eléctrica
11. Ingeniería Ambiental
12. Ingeniería en Energías Renovables
13. Ingeniería en Diseño Industrial

PROCESO DE ADMISIÓN:
- Examen de admisión obligatorio
- Documentos requeridos: Certificado de notas, diploma de bachiller, cédula de identidad
- Períodos de inscripción: Octubre-Noviembre para el año siguiente
- Examen se realiza en Enero

VIDA ESTUDIANTIL:
- Biblioteca Central con acceso a recursos digitales
- Laboratorios especializados por carrera
- Programas de intercambio internacional
- Actividades deportivas y culturales
- Residencia estudiantil disponible

INVESTIGACIÓN:
- Centro de Investigación y Estudios en Medio Ambiente (CIEMA)
- Programa de Investigación, Estudios Nacionales y Servicios Ambientales (PIENSA)
- Laboratorio de Biotecnología
- Centro de Producción más Limpia

VALORES INSTITUCIONALES:
- Excelencia académica
- Ética profesional
- Responsabilidad social
- Innovación tecnológica
- Compromiso ambiental

DIRECTRICES DE RESPUESTA:
- Sé amigable y profesional
- Mantén un tono institucional
- Da respuestas concisas y claras
- Si no tienes información específica, sugiere contactar a la universidad
- Usa "usted" para mantener formalidad
- Menciona la fuente oficial para más detalles: www.uni.edu.ni`
              },
              ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
              }))
            ],
            // Additional parameters to help with rate limiting
            max_tokens: 1000,
            temperature: 0.7,
            frequency_penalty: 0.1,
            presence_penalty: 0.1
          });

          if (!response.data.choices || !response.data.choices[0]?.message) {
            throw new Error('Invalid response format from OpenAI');
          }

          const result: Message = {
            id: Date.now().toString(),
            role: 'assistant' as const,
            content: response.data.choices[0].message.content
          };

          resolve(result);
        } catch (error: any) {
          console.error('Error in chat service:', error);
          
          let errorMessage = 'Lo siento, hubo un error al procesar su mensaje. Por favor, intente nuevamente.';
          
          if (error.response?.status === 429) {
            errorMessage = 'El servicio está temporalmente ocupado. Por favor, espere unos segundos antes de enviar otro mensaje.';
          } else if (error.response?.status === 401) {
            errorMessage = 'Error de autenticación. Por favor, contacte al soporte técnico.';
          } else if (error.response?.status === 403) {
            errorMessage = 'Acceso denegado. Verifique su configuración.';
          } else if (error.code === 'ECONNABORTED') {
            errorMessage = 'La petición ha tardado demasiado. Por favor, intente nuevamente.';
          }

          const errorResult: Message = {
            id: Date.now().toString(),
            role: 'assistant' as const,
            content: errorMessage
          };

          resolve(errorResult);
        }
      };

      // Add request to queue
      requestQueue.push(executeRequest);
      processQueue();
    });
  }
};