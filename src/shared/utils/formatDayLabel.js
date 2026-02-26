export function formatDayLabel(dayId){
    
    const day = Date(dayId) 
     
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month:"short",
        year: "numeric",
    }).format(new Date(day))
}