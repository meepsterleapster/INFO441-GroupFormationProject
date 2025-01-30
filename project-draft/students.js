function searchStudents() {
    const searchInput = document.getElementById('studentSearchInput').value.toLowerCase();
    const students = document.querySelectorAll('.card'); 

    students.forEach(student => {
        const studentName = student.dataset.name.toLowerCase();
        const studentRole = student.dataset.role.toLowerCase();
        const studentEmail = student.dataset.email.toLowerCase();

        const isMatch = studentName.includes(searchInput) || 
                        studentRole.includes(searchInput) || 
                        studentEmail.includes(searchInput);

        if (isMatch) {
            student.classList.remove('hidden');
        } else {
            student.classList.add('hidden');
        }
    });
}
