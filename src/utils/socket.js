class SocketService {
    socket;
    eventHandlers = new Map();
    errorHandler;
  
    constructor() {
      this.connect();
    }
  
    setupErrorHandling() {
      if (this.socket) {
        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          if (this.errorHandler) {
            this.errorHandler(new Error('WebSocket error'));
          }
        };
      }
    }
  
    setErrorHandler(handler) {
      this.errorHandler = handler;
    }
  
    // Listen for events
    on(event, callback) {
      if (!this.socket) {
        console.error('WebSocket is not initialized');
        return;
      }
  
      // Store the event handler
      if (!this.eventHandlers.has(event)) {
        this.eventHandlers.set(event, []);
      }
      this.eventHandlers.get(event).push(callback);
  
      // Set up message handling if not already set
      if (!this.socket.onmessage) {
        this.socket.onmessage = (message) => {
          try {
            const data = JSON.parse(message.data);
            const handlers = this.eventHandlers.get(data.type) || [];
            handlers.forEach(handler => handler(data));
            
            // Also handle generic 'message' event handlers
            const messageHandlers = this.eventHandlers.get('message') || [];
            messageHandlers.forEach(handler => handler(data));
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
      }
    }
  
    // Emit events
    emit(event, data) {
      if (!this.socket) {
        console.error('WebSocket is not initialized');
        return;
      }
      
      try {
        const payload = {
          type: event,
          ...data
        };
        console.log('Sending WebSocket message:', payload);
        this.socket.send(JSON.stringify(payload));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  
    // Remove event listener
    off(event, callback) {
      if (!this.eventHandlers.has(event)) return;
      
      const handlers = this.eventHandlers.get(event);
      const index = handlers.indexOf(callback);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
      
      if (handlers.length === 0) {
        this.eventHandlers.delete(event);
      }
    }
  
    // Disconnect socket
    disconnect() {
      if (!this.socket) {
        console.warn('WebSocket is already disconnected');
        return;
      }
      this.socket.close();
      this.eventHandlers.clear();
    }
  
    connect() {
      if (this.socket?.readyState === WebSocket.OPEN) {
        console.warn('WebSocket is already connected');
        return;
      }
  
      this.socket = new WebSocket('ws://localhost:3000/ws');
      
      this.setupErrorHandling();
      
      this.socket.onopen = () => {
        console.log('Connected to server');
      };
  
      this.socket.onclose = () => {
        console.log('Disconnected from server');
        // Implement reconnection with backoff
        setTimeout(() => this.connect(), 5000);
      };
    }
  
    isConnected() {
      return this.socket?.readyState === WebSocket.OPEN;
    }
  }
  
  // Export a singleton instance
  const socketService = new SocketService();
  export default socketService;