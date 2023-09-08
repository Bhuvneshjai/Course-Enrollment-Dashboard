const courses = [
    {
        title: "Introduction to Programming",
        description: "A foundational course that introduces the basics of programming using Python. Ideal for beginners.",
        instructor: "Dr. Emily Warren",
        enrolled: false
    },
    {
        title: "Web Development Basics",
        description: "Learn the foundations of web development, including HTML, CSS, and basic JavaScript.",
        instructor: "Prof. John Doe",
        enrolled: false
    },
    {
        title: "Advanced Machine Learning",
        description: "Dive deeper into machine learning with advanced algorithms and real-world project implementations.",
        instructor: "Dr. Alan Turing",
        enrolled: false
    },
    {
        title: "Digital Marketing Essentials",
        description: "Get acquainted with the fundamental tools and techniques in digital marketing.",
        instructor: "Ms. Jane Smith",
        enrolled: false
    },
    {
        title: "Business Analytics",
        description: "Understand the core strategies used in business analytics and their impact on decision making.",
        instructor: "Prof. Richard Feynman",
        enrolled: false
    },
    {
        title: "Artificial Intelligence Fundamentals",
        description: "An overview of AI concepts, algorithms, and how it's shaping the technological landscape.",
        instructor: "Dr. Ada Lovelace",
        enrolled: false
    },
    {
        title: "Database Management Systems",
        description: "Learn about relational databases, SQL, and the design of robust database systems.",
        instructor: "Prof. Barbara Liskov",
        enrolled: false
    },
    {
        title: "Graphic Design Principles",
        description: "A comprehensive course on the principles of design, typography, and color theory.",
        instructor: "Mr. Tim Berners-Lee",
        enrolled: false
    },
    {
        title: "Cybersecurity Essentials",
        description: "Equip yourself with the essential knowledge and skills to protect against cyber threats.",
        instructor: "Ms. Grace Hopper",
        enrolled: false
    },
    {
        title: "Data Visualization with D3.js",
        description: "Hands-on course on creating interactive data visualizations using D3.js.",
        instructor: "Dr. Donald Knuth",
        enrolled: false
    },
];

let displayedCourses = 5;

// Retrieve the current enrolled state from local storage (or use the initial state)
const storedCourses = JSON.parse(localStorage.getItem('courses'));
if (storedCourses) {
    for (let i = 0; i < courses.length; i++) {
        courses[i].enrolled = storedCourses[i].enrolled;
    }
}

function updateLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
}

function updateDisplay() {
    const courseList = document.getElementById("course-list");
    const enrolledCourses = document.getElementById("enrolled-courses");
    const filterText = document.getElementById("courseFilter").value.toLowerCase();

    courseList.innerHTML = '';
    enrolledCourses.innerHTML = '';

    courses.slice(0, displayedCourses).forEach((course, index) => {
        if (course.title.toLowerCase().includes(filterText) || course.instructor.toLowerCase().includes(filterText) || !filterText) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${course.title}</td>
                <td>${course.description}</td>
                <td>${course.instructor}</td>
                <td><button onclick="toggleEnrollment(${index})" class="btn ${course.enrolled ? 'btn-danger' : 'btn-success'}">${course.enrolled ? 'Unenroll' : 'Enroll'}</button></td>
            `;

            if (course.enrolled) {
                enrolledCourses.appendChild(row);
            } else {
                courseList.appendChild(row);
            }
        }
    });

    const loadMoreButton = document.getElementById("loadMoreButton");
    if (displayedCourses >= courses.length) {
        loadMoreButton.style.display = "none";
    } else {
        loadMoreButton.style.display = "block";
    }
}

function toggleEnrollment(index) {
    courses[index].enrolled = !courses[index].enrolled;
    updateLocalStorage();
    updateDisplay();
}

function loadMoreCourses() {
    displayedCourses += 5;
    updateDisplay();
}

updateDisplay();
