// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Sidebar Toggle Functionality
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    sidebar.classList.toggle('md:translate-x-0');
});

// Dark Mode Toggle Functionality
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
});

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    }
    updateThemeIcon();
}

// Update theme icon based on current mode
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (html.classList.contains('dark')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Initialize theme check
checkTheme();

// Sample data for AI tools
const sampleTools = [
    {
        name: "AI Writer Pro",
        category: "Writing",
        description: "Advanced AI writing assistant for content creation",
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        rating: 4.8,
        isPopular: true
    },
    {
        name: "Code Generator",
        category: "Development",
        description: "Generate code snippets in multiple programming languages",
        image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
        rating: 4.5,
        isPopular: true
    },
    {
        name: "Design Assistant",
        category: "Design",
        description: "AI-powered design suggestions and templates",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        rating: 4.3,
        isPopular: false
    },
    {
        name: "AI Chat Companion",
        category: "AI Assistant",
        description: "Conversational AI for personal and professional use",
        image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
        rating: 4.7,
        isPopular: true
    },
    {
        name: "Data Analyzer",
        category: "Development",
        description: "Automated data analysis and visualization",
        image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
        rating: 4.2,
        isPopular: false
    },
    {
        name: "Content Summarizer",
        category: "Writing",
        description: "Summarize long articles and documents instantly",
        image: "https://images.pexels.com/photos/316466/pexels-photo-316466.jpeg",
        rating: 4.4,
        isPopular: true
    }
];

// Function to render tool cards
function renderTools(tools) {
    const container = document.getElementById('tools-container');
    container.innerHTML = tools.map(tool => `
        <div class="card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="h-48 bg-gray-200 dark:bg-gray-700 relative">
                <div class="absolute top-2 right-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center ${tool.isPopular ? '' : 'hidden'}">
                    <i class="fas fa-star mr-1"></i> Popular
                </div>
                <div class="w-full h-full bg-cover bg-center" style="background-image: url('${tool.image}')"></div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start">
                    <h3 class="font-semibold text-lg text-gray-800 dark:text-white">${tool.name}</h3>
                    <div class="flex items-center text-yellow-400">
                        <i class="fas fa-star"></i>
                        <span class="ml-1 text-sm text-gray-600 dark:text-gray-300">${tool.rating}</span>
                    </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mt-2">${tool.description}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-sm text-blue-600 dark:text-blue-400">${tool.category}</span>
                    <button class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">Learn More</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter tools by category
function filterTools(category) {
    if (category === 'All Categories') {
        return sampleTools;
    }
    return sampleTools.filter(tool => tool.category === category);
}

// Sort tools by option
function sortTools(tools, sortBy) {
    const sorted = [...tools];
    switch(sortBy) {
        case 'Most Popular':
            return sorted.sort((a, b) => b.isPopular - a.isPopular || b.rating - a.rating);
        case 'Highest Rated':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'Newest':
            return sorted.reverse(); // In absence of date, reverse the array
        default:
            return sorted;
    }
}

// Initialize with sample data
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderTools(sampleTools);

    // Category filter event
    document.querySelectorAll('select')[0].addEventListener('change', (e) => {
        const filtered = filterTools(e.target.value);
        const sorted = sortTools(filtered, document.querySelectorAll('select')[1].value);
        renderTools(sorted);
    });

    // Sort by event
    document.querySelectorAll('select')[1].addEventListener('change', (e) => {
        const filtered = filterTools(document.querySelectorAll('select')[0].value);
        const sorted = sortTools(filtered, e.target.value);
        renderTools(sorted);
    });

    // Add chatbot icon
    const chatbotIcon = document.createElement('div');
    chatbotIcon.className = 'fixed bottom-5 right-5 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer';
    chatbotIcon.innerHTML = '<i class="fas fa-robot text-blue-600 dark:text-blue-400 text-2xl"></i>';
    document.body.appendChild(chatbotIcon);
});
