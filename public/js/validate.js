//

$(document).on('DOMContentLoaded', () => {
    const dateSelect = $('select[name="date"]');
    const monthSelect = $('select[name="month"]');
    const yearSelect = $('select[name="year"]');
    const form = $('form');

    function validateDate(){
        const selectedDate = new Date(
            parseInt(yearSelect.value),
            parseInt(monthSelect.value) - 1,
            parseInt(dateSelect.value)
        );

        const today = new Date();
        
        // Check if date is in the future
        if (selectedDate > today) {
            return false;
        }
        return true;
    }

    function updateDays(){
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const currentDay = dateSelect.value;
        
        if (month) {
            const daysInMonth = new Date(year, month, 0).getDate();
            const currentDayValue = dateSelect.value;
            
            // Store current scroll position
            const scrollPos = dateSelect.scrollTop;
            
            // Clear and repopulate days
            dateSelect.innerHTML = '<option value="" disabled selected>DD</option>';
            
            for (let i = 1; i <= daysInMonth; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                if (i === parseInt(currentDayValue)) {
                    option.selected = true;
                }
                dateSelect.appendChild(option);
            }
            // Restore scroll position
            dateSelect.scrollTop = scrollPos;
        }
    }

    monthSelect.on('change', updateDays);
    yearSelect.on('change', updateDays);

    form.on('submit', function(e) {
        if (!validateDate()) {
            e.preventDefault();
            alert('Date cannot be in the future');
        }
    });
});