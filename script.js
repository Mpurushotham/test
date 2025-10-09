// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced AI Search with ChatGPT-like Interface
class EnhancedAISearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.aiModel = document.getElementById('aiModel');
        this.fileInput = document.getElementById('fileInput');
        this.fileUploadArea = document.getElementById('fileUploadArea');
        this.promptSuggestions = document.getElementById('promptSuggestions');
        this.uploadedFiles = [];
        this.conversationHistory = [];
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.searchBtn.addEventListener('click', () => this.sendMessage());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Clear chat functionality
        const clearChatBtn = document.getElementById('clearChatBtn');
        if (clearChatBtn) {
            clearChatBtn.addEventListener('click', () => this.clearChat());
        }
        
        // File upload handling
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.fileUploadArea.addEventListener('click', () => this.fileInput.click());
        this.fileUploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.fileUploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        this.fileUploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        
        // Prompt suggestions
        this.searchInput.addEventListener('input', () => this.showPromptSuggestions());
        this.searchInput.addEventListener('focus', () => this.showPromptSuggestions());
        this.searchInput.addEventListener('blur', () => {
            setTimeout(() => this.hidePromptSuggestions(), 200);
        });
    }

    async sendMessage() {
        const message = this.searchInput.value.trim();
        const hasFiles = this.uploadedFiles.length > 0;
        
        if (!message && !hasFiles || this.isLoading) return;

        // Add user message to chat
        const userMessage = hasFiles ? 
            `${message} ${message ? '' : 'Please analyze the uploaded files.'} [Files: ${this.uploadedFiles.map(f => f.name).join(', ')}]` : 
            message;
        
        this.addMessage('user', userMessage);
        this.searchInput.value = '';
        this.hidePromptSuggestions();
        
        // Show chat interface
        this.chatMessages.classList.add('show');
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        // Add loading message
        const loadingId = this.addLoadingMessage();
        
        try {
            // Simulate AI response
            const response = await this.getAIResponse(message, hasFiles);
            this.removeLoadingMessage(loadingId);
            this.addMessage('assistant', response);
            
            // Add follow-up suggestions
            this.addFollowUpSuggestions(response);
            
        } catch (error) {
            this.removeLoadingMessage(loadingId);
            this.addMessage('assistant', 'Sorry, I encountered an error processing your request. Please try again.');
        }
    }

    clearChat() {
        this.chatMessages.innerHTML = '';
        this.conversationHistory = [];
        this.uploadedFiles = [];
        this.searchInput.value = '';
        this.hidePromptSuggestions();
        
        // Clear uploaded files display
        const uploadedFilesDiv = this.fileUploadArea.querySelector('.uploaded-files');
        if (uploadedFilesDiv) {
            uploadedFilesDiv.remove();
        }
        
        // Hide chat interface
        this.chatMessages.classList.remove('show');
    }

    addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = this.formatMessage(content);
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Store in conversation history
        this.conversationHistory.push({ type, content, timestamp: new Date() });
    }

    addLoadingMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant loading-message';
        messageDiv.id = 'loading-' + Date.now();
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = '<div class="loading"></div> Thinking...';
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        return messageDiv.id;
    }

    removeLoadingMessage(loadingId) {
        const loadingMessage = document.getElementById(loadingId);
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    formatMessage(content) {
        // Convert markdown-like formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    async getAIResponse(message, hasFiles = false) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const selectedModel = this.aiModel.value;
        const lowerMessage = message.toLowerCase();
        
        // Generate contextual responses based on model and query
        let response = this.generateContextualResponse(lowerMessage, selectedModel, hasFiles);
        
        // Add file context if files are uploaded
        if (hasFiles) {
            response += this.generateFileContext();
        }
        
        return response;
    }

    generateContextualResponse(message, model, hasFiles = false) {
        const responses = {
            'gpt-4': this.getGPT4Response(message, hasFiles),
            'gpt-3.5-turbo': this.getGPT35Response(message, hasFiles),
            'claude-3': this.getClaudeResponse(message, hasFiles),
            'gemini-pro': this.getGeminiResponse(message, hasFiles),
            'llama-2': this.getLlamaResponse(message, hasFiles),
            'palm-2': this.getPaLMResponse(message, hasFiles),
            'mistral-7b': this.getMistralResponse(message, hasFiles),
            'codellama': this.getCodeLlamaResponse(message, hasFiles),
            'vicuna': this.getVicunaResponse(message, hasFiles),
            'wizardcoder': this.getWizardCoderResponse(message, hasFiles),
            'starcoder': this.getStarCoderResponse(message, hasFiles),
            'deepseek-coder': this.getDeepSeekResponse(message, hasFiles)
        };
        
        return responses[model] || responses['gpt-4'];
    }

    getGPT4Response(message) {
        if (message.includes('cybersecurity') || message.includes('security')) {
            return `**Cybersecurity Analysis (GPT-4)**

Based on your query, here's a comprehensive analysis:

**Key Security Considerations:**
• Implement zero-trust architecture principles
• Deploy advanced threat detection using AI/ML
• Regular security audits and penetration testing
• Employee training and awareness programs
• Multi-factor authentication across all systems

**Recommended Actions:**
1. Conduct a comprehensive security assessment
2. Implement endpoint detection and response (EDR)
3. Set up security information and event management (SIEM)
4. Create incident response procedures
5. Regular backup and disaster recovery testing

Would you like me to elaborate on any specific aspect of cybersecurity implementation?`;
        }
        
        if (message.includes('ai') || message.includes('artificial intelligence')) {
            return `**AI Implementation Strategy (GPT-4)**

**Current AI Landscape:**
• Machine Learning models are becoming more accessible
• Large Language Models are revolutionizing business processes
• AI ethics and governance are critical considerations

**Implementation Roadmap:**
1. **Assessment Phase**: Identify use cases and data requirements
2. **Pilot Projects**: Start with low-risk, high-impact applications
3. **Infrastructure Setup**: Cloud-based AI services or on-premises
4. **Model Development**: Custom models or pre-trained solutions
5. **Deployment**: Production-ready AI applications
6. **Monitoring**: Performance tracking and continuous improvement

**Key Technologies:**
• TensorFlow/PyTorch for ML development
• OpenAI API for language tasks
• AWS SageMaker/Azure ML for model deployment
• MLOps for production management

What specific AI use case are you looking to implement?`;
        }
        
        return `**Comprehensive Analysis (GPT-4)**

I understand you're looking for guidance on: "${message}"

**My Analysis:**
This is a complex topic that requires careful consideration of multiple factors. Let me break this down systematically:

**Key Considerations:**
• Technical requirements and constraints
• Business objectives and ROI
• Implementation timeline and resources
• Risk assessment and mitigation
• Long-term scalability and maintenance

**Recommended Approach:**
1. **Discovery Phase**: Gather detailed requirements
2. **Research Phase**: Investigate best practices and solutions
3. **Planning Phase**: Create detailed implementation plan
4. **Execution Phase**: Implement with proper testing
5. **Optimization Phase**: Monitor and improve

**Next Steps:**
Could you provide more specific details about your current situation, constraints, and desired outcomes? This will help me give you more targeted advice.`;
    }

    getGPT35Response(message) {
        return `**Quick Response (GPT-3.5 Turbo)**

I can help you with: "${message}"

**Key Points:**
• This is a common challenge in modern business
• Several proven approaches exist
• Implementation depends on your specific context

**Immediate Actions:**
1. Define clear objectives
2. Research available solutions
3. Create implementation timeline
4. Start with pilot project

Would you like me to dive deeper into any specific aspect?`;
    }

    getClaudeResponse(message) {
        return `**Thoughtful Analysis (Claude 3)**

Regarding "${message}", I'd like to approach this systematically:

**Understanding the Problem:**
This appears to be a multifaceted challenge that requires careful analysis of both technical and business considerations.

**My Perspective:**
• Every solution has trade-offs
• Context matters significantly
• Iterative approach often works best
• Documentation and monitoring are crucial

**Suggested Framework:**
1. **Problem Definition**: Clearly articulate the challenge
2. **Solution Research**: Investigate multiple approaches
3. **Risk Assessment**: Identify potential issues
4. **Implementation Plan**: Step-by-step execution
5. **Success Metrics**: How to measure progress

What's your current understanding of this challenge, and what specific outcomes are you hoping to achieve?`;
    }

    getGeminiResponse(message) {
        return `**Multi-Modal Analysis (Gemini Pro)**

Your query about "${message}" touches on several important areas:

**Technical Considerations:**
• Scalability and performance requirements
• Integration with existing systems
• Security and compliance needs
• User experience optimization

**Business Impact:**
• Cost-benefit analysis
• Time-to-market considerations
• Competitive advantages
• Long-term strategic value

**Implementation Strategy:**
1. **Phase 1**: Foundation and core functionality
2. **Phase 2**: Advanced features and optimization
3. **Phase 3**: Scale and expand capabilities

**Questions for You:**
• What's your current technical stack?
• What's your timeline and budget?
• Who are your target users?
• What success looks like to you?

This information will help me provide more specific guidance.`;
    }

    getLlamaResponse(message) {
        return `**Open Source Perspective (Llama 2)**

For "${message}", here's my analysis:

**Open Source Solutions:**
• Often more cost-effective
• High customization potential
• Strong community support
• Transparency and security benefits

**Implementation Considerations:**
• Technical expertise requirements
• Community support availability
• Documentation quality
• Long-term maintenance

**Recommended Approach:**
1. Evaluate open source options
2. Consider hybrid solutions
3. Plan for community engagement
4. Ensure proper documentation

What's your experience level with open source technologies?`;
    }

    getPaLMResponse(message, hasFiles = false) {
        return `**Google AI Perspective (PaLM 2)**

Regarding "${message}":

**Google Cloud Integration:**
• Seamless integration with Google services
• Advanced AI/ML capabilities
• Global infrastructure
• Enterprise-grade security

**Key Benefits:**
• Scalable and reliable
• Advanced analytics
• Machine learning integration
• Cost optimization

**Implementation Path:**
1. **Assessment**: Current state analysis
2. **Migration**: Gradual transition strategy
3. **Optimization**: Performance tuning
4. **Innovation**: Advanced features

Are you currently using any Google Cloud services?`;
    }

    getMistralResponse(message, hasFiles = false) {
        return `**Efficient AI Analysis (Mistral 7B)**

For "${message}", here's my analysis:

**Mistral AI Advantages:**
• Fast inference and low latency
• Cost-effective for high-volume usage
• Strong performance on code generation
• Multilingual capabilities

**Key Insights:**
• Focus on practical implementation
• Consider performance vs. cost trade-offs
• Leverage open-source ecosystem
• Optimize for your specific use case

**Recommended Approach:**
1. **Quick Start**: Rapid prototyping and testing
2. **Iteration**: Fast feedback loops
3. **Optimization**: Performance tuning
4. **Scale**: Production deployment

What's your primary use case for this solution?`;
    }

    getCodeLlamaResponse(message, hasFiles = false) {
        return `**Code-Focused Analysis (Code Llama)**

Regarding "${message}":

**Code Llama Strengths:**
• Specialized for code generation and understanding
• Support for multiple programming languages
• Code completion and debugging assistance
• Integration with development workflows

**Code Generation Capabilities:**
• Python, JavaScript, Java, C++, and more
• Documentation generation
• Code review and optimization
• Test case generation

**Implementation Strategy:**
1. **Code Analysis**: Review existing codebase
2. **Generation**: Create new code components
3. **Testing**: Generate test cases
4. **Documentation**: Auto-generate docs

Would you like me to generate specific code examples?`;
    }

    getVicunaResponse(message, hasFiles = false) {
        return `**Open Source AI Analysis (Vicuna)**

For "${message}":

**Vicuna Advantages:**
• Open-source and freely available
• Strong conversational abilities
• Good performance on various tasks
• Community-driven development

**Key Features:**
• Natural language understanding
• Context-aware responses
• Multilingual support
• Customizable and extensible

**Implementation Approach:**
1. **Setup**: Deploy Vicuna model
2. **Configuration**: Customize for your needs
3. **Integration**: Connect to your systems
4. **Monitoring**: Track performance and usage

What specific requirements do you have for this solution?`;
    }

    getWizardCoderResponse(message, hasFiles = false) {
        return `**Code Wizard Analysis (WizardCoder)**

Regarding "${message}":

**WizardCoder Specialization:**
• Advanced code generation capabilities
• Strong performance on programming tasks
• Support for complex code structures
• Integration with development tools

**Code Generation Features:**
• Multi-language support
• Complex algorithm implementation
• Code optimization suggestions
• Bug fixing and debugging

**Development Workflow:**
1. **Requirements**: Understand the problem
2. **Design**: Plan the solution architecture
3. **Implementation**: Generate the code
4. **Review**: Test and optimize

Would you like me to generate specific code implementations?`;
    }

    getStarCoderResponse(message, hasFiles = false) {
        return `**StarCoder Analysis (Hugging Face)**

For "${message}":

**StarCoder Capabilities:**
• Large-scale code generation
• GitHub-trained model
• Multi-language programming support
• Strong performance on coding tasks

**Key Strengths:**
• Extensive training on diverse codebases
• Good understanding of programming patterns
• Support for various frameworks
• Integration with development environments

**Implementation Strategy:**
1. **Model Setup**: Deploy StarCoder
2. **Context Preparation**: Prepare your requirements
3. **Code Generation**: Generate solutions
4. **Integration**: Incorporate into your workflow

What programming languages or frameworks are you working with?`;
    }

    getDeepSeekResponse(message, hasFiles = false) {
        return `**DeepSeek Coder Analysis**

Regarding "${message}":

**DeepSeek Coder Features:**
• Specialized for code understanding and generation
• Strong performance on complex programming tasks
• Support for multiple programming languages
• Advanced reasoning capabilities

**Code Analysis Capabilities:**
• Code comprehension and explanation
• Bug detection and fixing
• Performance optimization
• Architecture recommendations

**Development Process:**
1. **Analysis**: Deep understanding of requirements
2. **Planning**: Strategic solution design
3. **Implementation**: High-quality code generation
4. **Optimization**: Performance and maintainability

What specific coding challenges are you facing?`;
    }

    generateFileContext() {
        return `

**📎 File Context:**
I notice you've uploaded ${this.uploadedFiles.length} file(s). I can analyze these files to provide more specific guidance. The uploaded files include:
${this.uploadedFiles.map(file => `• ${file.name} (${file.type})`).join('\n')}

Would you like me to analyze the content of these files to provide more targeted recommendations?`;
    }

    addFollowUpSuggestions(response) {
        const suggestions = this.generateFollowUpSuggestions(response);
        if (suggestions.length > 0) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'follow-up-suggestions';
            suggestionsDiv.innerHTML = `
                <div style="margin-top: 1rem; padding: 1rem; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
                    <strong>💡 Follow-up Questions:</strong>
                    <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${suggestions.map(suggestion => 
                            `<span class="suggestion-tag" onclick="window.aiSearch.selectSuggestion('${suggestion}')">${suggestion}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
            this.chatMessages.appendChild(suggestionsDiv);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }

    generateFollowUpSuggestions(response) {
        const suggestions = [];
        
        if (response.includes('cybersecurity')) {
            suggestions.push('How do I implement zero-trust architecture?', 'What are the best security tools?', 'How to train employees on security?');
        }
        
        if (response.includes('AI') || response.includes('artificial intelligence')) {
            suggestions.push('What AI models should I use?', 'How to measure AI ROI?', 'What are the ethical considerations?');
        }
        
        if (response.includes('cloud')) {
            suggestions.push('Which cloud provider is best?', 'How to migrate to cloud?', 'What about cloud security?');
        }
        
        suggestions.push('Can you provide more details?', 'What are the costs involved?', 'How long does implementation take?');
        
        return suggestions.slice(0, 4); // Limit to 4 suggestions
    }

    selectSuggestion(suggestion) {
        this.searchInput.value = suggestion;
        this.sendMessage();
    }

    // File upload handling
    handleFileUpload(event) {
        const files = Array.from(event.target.files);
        this.processFiles(files);
    }

    handleDragOver(event) {
        event.preventDefault();
        this.fileUploadArea.classList.add('dragover');
    }

    handleDrop(event) {
        event.preventDefault();
        this.fileUploadArea.classList.remove('dragover');
        const files = Array.from(event.dataTransfer.files);
        this.processFiles(files);
    }

    handleDragLeave(event) {
        event.preventDefault();
        this.fileUploadArea.classList.remove('dragover');
    }

    processFiles(files) {
        files.forEach(file => {
            if (this.validateFile(file)) {
                this.uploadedFiles.push(file);
                this.displayUploadedFile(file);
            }
        });
    }

    validateFile(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['text/plain', 'application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/json'];
        
        if (file.size > maxSize) {
            alert('File size must be less than 10MB');
            return false;
        }
        
        if (!allowedTypes.includes(file.type)) {
            alert('File type not supported');
            return false;
        }
        
        return true;
    }

    displayUploadedFile(file) {
        const uploadedFilesDiv = this.fileUploadArea.querySelector('.uploaded-files') || 
            this.createUploadedFilesDiv();
        
        const fileTag = document.createElement('div');
        fileTag.className = 'file-tag';
        fileTag.innerHTML = `
            ${file.name}
            <span class="remove-file" onclick="window.aiSearch.removeFile('${file.name}')">×</span>
        `;
        
        uploadedFilesDiv.appendChild(fileTag);
    }

    createUploadedFilesDiv() {
        const div = document.createElement('div');
        div.className = 'uploaded-files';
        this.fileUploadArea.appendChild(div);
        return div;
    }

    removeFile(fileName) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== fileName);
        const fileTags = this.fileUploadArea.querySelectorAll('.file-tag');
        fileTags.forEach(tag => {
            if (tag.textContent.includes(fileName)) {
                tag.remove();
            }
        });
    }

    // Prompt suggestions
    showPromptSuggestions() {
        const query = this.searchInput.value.toLowerCase();
        if (query.length < 2) {
            this.hidePromptSuggestions();
            return;
        }

        const suggestions = this.getPromptSuggestions(query);
        if (suggestions.length > 0) {
            this.promptSuggestions.innerHTML = suggestions.map(suggestion => 
                `<span class="suggestion-tag" onclick="window.aiSearch.selectSuggestion('${suggestion}')">${suggestion}</span>`
            ).join('');
            this.promptSuggestions.classList.add('show');
        }
    }

    hidePromptSuggestions() {
        this.promptSuggestions.classList.remove('show');
    }

    getPromptSuggestions(query) {
        const allSuggestions = [
            'How to implement cybersecurity best practices?',
            'What are the latest AI trends in business?',
            'How to migrate to cloud infrastructure?',
            'What is zero-trust architecture?',
            'How to build a machine learning model?',
            'What are the benefits of microservices?',
            'How to implement DevOps practices?',
            'What is containerization and Kubernetes?',
            'How to secure cloud applications?',
            'What are the best practices for API design?',
            'How to implement data analytics?',
            'What is edge computing?',
            'How to choose the right database?',
            'What are the security implications of IoT?',
            'How to implement CI/CD pipelines?'
        ];

        return allSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(query)
        ).slice(0, 5);
    }
}

// Contact Form Handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        this.showLoading();
        
        setTimeout(() => {
            this.showSuccess();
            this.form.reset();
        }, 2000);
    }

    showLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;
    }

    showSuccess() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        this.init();
    }

    init() {
        // Add animation to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to features
        document.querySelectorAll('.feature').forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(30px)';
            feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(feature);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiSearch = new EnhancedAISearch();
    new ContactForm();
    new ScrollAnimations();
    
    // Add smooth reveal animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}