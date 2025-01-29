  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 font-display">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <div className="flex items-center gap-2">
              {event.status && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              )}
              <ShareButton 
                title={event.title} 
                text={`Check out this event: ${event.title}`} 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* ... rest of the JSX ... */}
        </div>
      </div>
    </div>
  ) 