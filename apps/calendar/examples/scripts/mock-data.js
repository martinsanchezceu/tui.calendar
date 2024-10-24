// Mock de los calendarios como ya los tenías definidos
var MOCK_CALENDARS = [
  {
    id: '1',
    name: 'My Calendar',
    color: '#ffffff',
    borderColor: '#9e5fff',
    backgroundColor: '#9e5fff',
    dragBackgroundColor: '#9e5fff',
  },
  {
    id: '2',
    name: 'Work',
    color: '#ffffff',
    borderColor: '#00a9ff',
    backgroundColor: '#ff09d2',
    dragBackgroundColor: '#00a9ff',
  },
  {
    id: '3',
    name: 'Family',
    color: '#ffffff',
    borderColor: '#DB473F',
    backgroundColor: '#DB473F',
    dragBackgroundColor: '#DB473F',
  },
  {
    id: '4',
    name: 'Friends',
    color: '#ffffff',
    borderColor: '#03bd9e',
    backgroundColor: '#03bd9e',
    dragBackgroundColor: '#03bd9e',
  },
  {
    id: '5',
    name: 'Travel',
    color: '#ffffff',
    borderColor: '#bbdc00',
    backgroundColor: '#bbdc00',
    dragBackgroundColor: '#bbdc00',
  },
];

var EVENT_CATEGORIES = ['milestone', 'task'];

// Función para transformar los datos del evento recibido
function transformEventData(events) {
  return events.map(event => {
    const calendar = MOCK_CALENDARS.find(c => c.id === event.calendarId);
    const aula = event.location || "Aula no disponible"; // Puedes ajustar según lo que quieras mostrar en 'aula'

    return {
      titulo: event.title,
      categoria: event.category,
      inicio: event.start,
      fin: event.end,
      aula: aula,
      asistentes: event.attendees,
      estado: event.state,
      color: calendar ? calendar.backgroundColor : '#000000' // Asumiendo que quieres el color de fondo del calendario
    };
  });
}

// Hacer la solicitud a la API para obtener eventos en el rango de fechas
async function fetchEventsFromAPI(startDate, endDate) {
  try {
    const url = `https://uch-espacios.api.ceu.es/api/Events/all/${startDate}/${endDate}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // Transformamos los eventos obtenidos de la API
      const eventosTransformados = transformEventData(data);
      console.log(eventosTransformados); // Muestra los eventos transformados
      return eventosTransformados;
    } else {
      console.error('Error en la respuesta de la API:', data);
    }
  } catch (error) {
    console.error('Error al obtener eventos de la API:', error);
  }
}

// Función para generar eventos manuales, como ya tenías
function generateRandomEvents(viewName, renderStart, renderEnd) {
  var events = [];

  // Eventos manuales como ya tenías
  events.push({
    id: '1',
    calendarId: '1', // My Calendar
    title: 'Reunión con cliente',
    category: 'time',
    start: new Date('2024-10-18T10:00:00'),
    end: new Date('2024-10-18T11:00:00'),
    isAllday: false,
    isReadOnly: false,
    location: 'Oficina',
    state: 'Busy',
    attendees: ['Juan', 'Maria']
  });

  events.push({
    id: '2',
    calendarId: '2', // Work
    title: 'Planificación del proyecto',
    category: 'time',
    start: new Date('2024-10-19T14:00:00'),
    end: new Date('2024-10-19T16:00:00'),
    isAllday: false,
    isReadOnly: false,
    location: 'Sala de reuniones',
    state: 'Busy',
    attendees: ['Pedro', 'Ana']
  });

  events.push({
    id: '3',
    calendarId: '3', // Family
    title: 'Cena familiar',
    category: 'allday',
    start: new Date('2024-10-20T00:00:00'),
    end: new Date('2024-10-20T23:59:59'),
    isAllday: true,
    isReadOnly: false,
    location: 'Casa',
    state: 'Free',
    attendees: ['Familia']
  });

  return events;
}

// Llama a la API para obtener los eventos en el rango de fechas
function getEvents(viewName, renderStart, renderEnd) {
  const startDate = renderStart.toISOString().split('T')[0]; // Convierte la fecha de inicio al formato YYYY-MM-DD
  const endDate = renderEnd.toISOString().split('T')[0];     // Convierte la fecha de fin al formato YYYY-MM-DD

  fetchEventsFromAPI(startDate, endDate).then(events => {
    if (!events || events.length === 0) {
      console.log('No se encontraron eventos desde la API, generando eventos manuales...');
      const eventosManuales = generateRandomEvents(viewName, renderStart, renderEnd);
      console.log(eventosManuales); // Muestra los eventos manuales si la API falla o no retorna nada
    } else {
      // Si la API retorna eventos, los mostramos transformados
      console.log('Eventos desde la API:', events);
    }
  });
}

// Suponiendo que tienes un rango de fechas en la vista
const renderStart = new Date('2024-10-18T00:00:00');
const renderEnd = new Date('2024-10-20T23:59:59');

// Llama a la función para obtener eventos en el rango de fechas
getEvents('week', renderStart, renderEnd);
