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

// Solution Database
const solutionDatabase = {
    'aws-zero-trust': {
        title: 'AWS Zero Trust Architecture Implementation',
        description: 'Complete implementation guide for zero trust security model using AWS services',
        steps: [
            {
                step: 1,
                title: 'Identity Foundation',
                description: 'Implement AWS IAM with least privilege access',
                details: [
                    'Create IAM roles and policies with minimal permissions',
                    'Enable MFA for all users and root accounts',
                    'Implement AWS SSO for centralized identity management',
                    'Set up AWS Organizations for multi-account governance'
                ],
                tools: ['AWS IAM', 'AWS SSO', 'AWS Organizations', 'AWS CloudTrail']
            },
            {
                step: 2,
                title: 'Network Segmentation',
                description: 'Create isolated network segments using VPC',
                details: [
                    'Design VPC architecture with public and private subnets',
                    'Implement NACLs and Security Groups for micro-segmentation',
                    'Set up VPC endpoints for secure AWS service access',
                    'Configure AWS Transit Gateway for multi-VPC connectivity'
                ],
                tools: ['Amazon VPC', 'NACLs', 'Security Groups', 'Transit Gateway']
            },
            {
                step: 3,
                title: 'Data Protection',
                description: 'Encrypt data at rest and in transit',
                details: [
                    'Enable S3 encryption with AWS KMS',
                    'Implement EBS encryption for EC2 instances',
                    'Set up AWS Certificate Manager for SSL/TLS',
                    'Configure AWS CloudHSM for key management'
                ],
                tools: ['AWS KMS', 'S3 Encryption', 'EBS Encryption', 'CloudHSM']
            },
            {
                step: 4,
                title: 'Monitoring & Detection',
                description: 'Implement comprehensive security monitoring',
                details: [
                    'Enable AWS GuardDuty for threat detection',
                    'Set up AWS Security Hub for centralized security findings',
                    'Configure AWS Config for compliance monitoring',
                    'Implement AWS CloudWatch for logging and alerting'
                ],
                tools: ['GuardDuty', 'Security Hub', 'AWS Config', 'CloudWatch']
            }
        ],
        architecture: `
        ┌─────────────────────────────────────────────────────────────┐
        │                    Zero Trust Architecture                   │
        ├─────────────────────────────────────────────────────────────┤
        │  Internet Gateway                                          │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │                AWS WAF                              │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Load Balancer              │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Public Subnet                          │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   Web App   │  │   Bastion   │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Private Subnet                         │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │ Application │  │  Database   │                  │    │
        │  │  │   Server    │  │   Server    │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Data Subnet                            │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   RDS       │  │   S3        │                  │    │
        │  │  │  Database   │  │  Storage    │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        cost: '$2,000-5,000/month for medium enterprise',
        timeline: '4-6 weeks implementation'
    },
    'aws-encryption': {
        title: 'AWS Data Encryption at Scale',
        description: 'Comprehensive data encryption strategy for AWS environments',
        steps: [
            {
                step: 1,
                title: 'Key Management Setup',
                description: 'Configure AWS KMS for centralized key management',
                details: [
                    'Create customer-managed keys in AWS KMS',
                    'Set up key rotation policies',
                    'Configure key policies and permissions',
                    'Implement cross-region key replication'
                ],
                tools: ['AWS KMS', 'CloudHSM', 'AWS Secrets Manager']
            },
            {
                step: 2,
                title: 'S3 Encryption',
                description: 'Implement encryption for S3 storage',
                details: [
                    'Enable default encryption for S3 buckets',
                    'Configure server-side encryption with KMS',
                    'Set up bucket policies for encryption enforcement',
                    'Implement client-side encryption for sensitive data'
                ],
                tools: ['Amazon S3', 'AWS KMS', 'S3 Client-Side Encryption']
            },
            {
                step: 3,
                title: 'Database Encryption',
                description: 'Encrypt RDS and DynamoDB data',
                details: [
                    'Enable encryption at rest for RDS instances',
                    'Configure DynamoDB encryption with KMS',
                    'Set up encrypted snapshots and backups',
                    'Implement TDE for Oracle and SQL Server'
                ],
                tools: ['Amazon RDS', 'DynamoDB', 'AWS KMS']
            },
            {
                step: 4,
                title: 'Transit Encryption',
                description: 'Encrypt data in transit',
                details: [
                    'Configure SSL/TLS for all connections',
                    'Set up AWS Certificate Manager',
                    'Implement VPC endpoints for secure communication',
                    'Use AWS Direct Connect with encryption'
                ],
                tools: ['AWS Certificate Manager', 'VPC Endpoints', 'Direct Connect']
            }
        ],
        architecture: `
        ┌─────────────────────────────────────────────────────────────┐
        │                    Encryption Architecture                   │
        ├─────────────────────────────────────────────────────────────┤
        │  Client Application                                        │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              TLS/SSL Encryption                     │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Load Balancer              │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │            SSL Termination                  │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Servers                    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Client-Side Encryption              │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              AWS KMS                                │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Customer Managed Keys               │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Encrypted Storage                      │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   S3        │  │    RDS      │                  │    │
        │  │  │ Encryption  │  │ Encryption  │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        cost: '$500-1,500/month for medium enterprise',
        timeline: '2-3 weeks implementation'
    },
    'azure-iam': {
        title: 'Azure Identity & Access Management',
        description: 'Comprehensive IAM solution using Azure Active Directory',
        steps: [
            {
                step: 1,
                title: 'Azure AD Configuration',
                description: 'Set up Azure Active Directory with security features',
                details: [
                    'Configure Azure AD Premium P2 features',
                    'Set up conditional access policies',
                    'Enable identity protection',
                    'Configure privileged identity management (PIM)'
                ],
                tools: ['Azure AD', 'Conditional Access', 'Identity Protection', 'PIM']
            },
            {
                step: 2,
                title: 'Multi-Factor Authentication',
                description: 'Implement MFA for all users and applications',
                details: [
                    'Enable MFA for all user accounts',
                    'Configure app-specific passwords',
                    'Set up Azure MFA server for on-premise',
                    'Implement risk-based MFA policies'
                ],
                tools: ['Azure MFA', 'Microsoft Authenticator', 'Azure MFA Server']
            },
            {
                step: 3,
                title: 'Role-Based Access Control',
                description: 'Implement RBAC for Azure resources',
                details: [
                    'Create custom roles with specific permissions',
                    'Assign roles at appropriate scope levels',
                    'Implement just-in-time access',
                    'Set up access reviews and certifications'
                ],
                tools: ['Azure RBAC', 'Custom Roles', 'Access Reviews']
            },
            {
                step: 4,
                title: 'Monitoring & Auditing',
                description: 'Monitor and audit access activities',
                details: [
                    'Enable Azure AD audit logs',
                    'Set up Azure Monitor for IAM events',
                    'Configure security alerts',
                    'Implement compliance reporting'
                ],
                tools: ['Azure Monitor', 'Log Analytics', 'Security Center']
            }
        ],
        architecture: `
        ┌─────────────────────────────────────────────────────────────┐
        │                Azure IAM Architecture                       │
        ├─────────────────────────────────────────────────────────────┤
        │  Users & Devices                                          │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Multi-Factor Authentication            │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Azure Active Directory                 │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Conditional Access Policies         │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Identity Protection                 │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Privileged Identity Management     │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Azure Resources                        │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   VMs       │  │  Storage    │                  │    │
        │  │  │   Apps      │  │  Databases  │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Monitoring & Auditing                  │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Azure Monitor                       │    │    │
        │  │  │         Log Analytics                       │    │    │
        │  │  │         Security Center                     │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        cost: '$1,500-3,000/month for medium enterprise',
        timeline: '3-4 weeks implementation'
    }
};

// Architecture Database
const architectureDatabase = {
    'zero-trust': {
        title: 'Zero Trust Security Architecture',
        description: 'Comprehensive zero trust implementation framework',
        components: [
            'Identity & Access Management',
            'Network Segmentation',
            'Data Protection',
            'Device Security',
            'Application Security',
            'Monitoring & Analytics'
        ],
        diagram: `
        ┌─────────────────────────────────────────────────────────────┐
        │                    Zero Trust Architecture                   │
        ├─────────────────────────────────────────────────────────────┤
        │  External Users & Devices                                  │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Identity Verification                  │    │
        │  │  • Multi-Factor Authentication                     │    │
        │  │  • Device Compliance Check                         │    │
        │  │  • Risk Assessment                                 │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Network Perimeter                      │    │
        │  │  • Software-Defined Perimeter (SDP)                │    │
        │  │  • Micro-segmentation                              │    │
        │  │  • Dynamic Access Control                          │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Layer                      │    │
        │  │  • API Gateway with Authentication                 │    │
        │  │  • Application-level Authorization                 │    │
        │  │  • Continuous Security Monitoring                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Data Layer                             │    │
        │  │  • Data Classification & Labeling                  │    │
        │  │  • Encryption at Rest & in Transit                 │    │
        │  │  • Data Loss Prevention (DLP)                      │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Monitoring & Analytics                 │    │
        │  │  • Security Information & Event Management (SIEM)  │    │
        │  │  • User & Entity Behavior Analytics (UEBA)         │    │
        │  │  • Security Orchestration & Response (SOAR)        │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        implementation: [
            'Phase 1: Identity Foundation (Weeks 1-4)',
            'Phase 2: Network Segmentation (Weeks 5-8)',
            'Phase 3: Application Security (Weeks 9-12)',
            'Phase 4: Data Protection (Weeks 13-16)',
            'Phase 5: Monitoring & Optimization (Weeks 17-20)'
        ]
    },
    'cloud-security': {
        title: 'Multi-Cloud Security Framework',
        description: 'Comprehensive security framework for multi-cloud environments',
        components: [
            'Cloud Access Security Broker (CASB)',
            'Cloud Workload Protection',
            'Cloud Data Loss Prevention',
            'Cloud Security Posture Management',
            'Cloud Identity & Access Management',
            'Cloud Security Monitoring'
        ],
        diagram: `
        ┌─────────────────────────────────────────────────────────────┐
        │                Multi-Cloud Security Framework               │
        ├─────────────────────────────────────────────────────────────┤
        │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
        │  │     AWS     │  │    Azure    │  │     GCP     │        │
        │  │             │  │             │  │             │        │
        │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │        │
        │  │ │  IAM    │ │  │ │  Azure  │ │  │ │ Cloud   │ │        │
        │  │ │  KMS    │ │  │ │   AD    │ │  │ │  IAM    │ │        │
        │  │ │ GuardDuty│ │  │ │ Key Vault│ │  │ │ Security│ │        │
        │  │ └─────────┘ │  │ └─────────┘ │  │ │ Command │ │        │
        │  │             │  │             │  │ │ Center  │ │        │
        │  └─────────────┘  └─────────────┘  │ └─────────┘ │        │
        │                                   └─────────────┘        │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Centralized Security Layer             │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Cloud Access Security Broker        │    │    │
        │  │  │         (CASB)                             │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Security Orchestration              │    │    │
        │  │  │         & Response (SOAR)                  │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Security Information &              │    │    │
        │  │  │         Event Management (SIEM)            │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        implementation: [
            'Phase 1: Cloud Discovery & Assessment (Weeks 1-2)',
            'Phase 2: CASB Implementation (Weeks 3-6)',
            'Phase 3: Workload Protection (Weeks 7-10)',
            'Phase 4: Data Protection (Weeks 11-14)',
            'Phase 5: Monitoring & Response (Weeks 15-18)'
        ]
    }
};

// Show solution details
function showSolution(solutionId) {
    const solution = solutionDatabase[solutionId];
    if (!solution) return;

    const modal = document.getElementById('solutionModal');
    const content = document.getElementById('solutionContent');
    
    content.innerHTML = `
        <div class="solution-detail">
            <h2>${solution.title}</h2>
            <p class="solution-description">${solution.description}</p>
            
            <div class="solution-steps">
                <h3>Implementation Steps</h3>
                ${solution.steps.map(step => `
                    <div class="step-item">
                        <div class="step-header">
                            <span class="step-number">${step.step}</span>
                            <h4>${step.title}</h4>
                        </div>
                        <p class="step-description">${step.description}</p>
                        <div class="step-details">
                            <h5>Implementation Details:</h5>
                            <ul>
                                ${step.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="step-tools">
                            <h5>Tools & Services:</h5>
                            <div class="tools-list">
                                ${step.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="solution-architecture">
                <h3>Architecture Diagram</h3>
                <pre class="architecture-diagram">${solution.architecture}</pre>
            </div>
            
            <div class="solution-meta">
                <div class="meta-item">
                    <strong>Estimated Cost:</strong> ${solution.cost}
                </div>
                <div class="meta-item">
                    <strong>Timeline:</strong> ${solution.timeline}
                </div>
            </div>
            
            <div class="solution-actions">
                <button class="btn btn-primary" onclick="downloadSolution('${solutionId}')">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button class="btn btn-secondary" onclick="shareSolution('${solutionId}')">
                    <i class="fas fa-share"></i> Share Solution
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Show architecture details
function showArchitecture(archId) {
    const architecture = architectureDatabase[archId];
    if (!architecture) return;

    const modal = document.getElementById('solutionModal');
    const content = document.getElementById('solutionContent');
    
    content.innerHTML = `
        <div class="architecture-detail">
            <h2>${architecture.title}</h2>
            <p class="architecture-description">${architecture.description}</p>
            
            <div class="architecture-components">
                <h3>Key Components</h3>
                <div class="components-grid">
                    ${architecture.components.map(component => `
                        <div class="component-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${component}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="architecture-diagram-section">
                <h3>Architecture Diagram</h3>
                <pre class="architecture-diagram">${architecture.diagram}</pre>
            </div>
            
            <div class="implementation-phases">
                <h3>Implementation Phases</h3>
                <div class="phases-list">
                    ${architecture.implementation.map(phase => `
                        <div class="phase-item">
                            <i class="fas fa-arrow-right"></i>
                            <span>${phase}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="architecture-actions">
                <button class="btn btn-primary" onclick="downloadArchitecture('${archId}')">
                    <i class="fas fa-download"></i> Download Architecture
                </button>
                <button class="btn btn-secondary" onclick="shareArchitecture('${archId}')">
                    <i class="fas fa-share"></i> Share Architecture
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('solutionModal').style.display = 'none';
}

// Show automation script
function showAutomation(automationId) {
    const automationScripts = {
        'aws-terraform': {
            title: 'AWS Terraform Security Configuration',
            content: `# Complete AWS Security Infrastructure with Terraform

# Variables
variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

# Security Groups
resource "aws_security_group" "web_sg" {
  name_prefix = "web-"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    SecurityLevel = "high"
    Name = "Web Security Group"
  }
}

# IAM Role for EC2 instances
resource "aws_iam_role" "ec2_role" {
  name = "ec2-security-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# Attach security policies
resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# CloudTrail for audit logging
resource "aws_cloudtrail" "security_trail" {
  name                          = "security-audit-trail"
  s3_bucket_name                = aws_s3_bucket.cloudtrail_bucket.id
  include_global_service_events = true
  is_multi_region_trail         = true
  enable_logging                = true
}

# S3 bucket for CloudTrail
resource "aws_s3_bucket" "cloudtrail_bucket" {
  bucket = "security-cloudtrail-${random_id.bucket_suffix.hex}"
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# S3 bucket policy for CloudTrail
resource "aws_s3_bucket_policy" "cloudtrail_policy" {
  bucket = aws_s3_bucket.cloudtrail_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AWSCloudTrailAclCheck"
        Effect = "Allow"
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        }
        Action   = "s3:GetBucketAcl"
        Resource = aws_s3_bucket.cloudtrail_bucket.arn
      },
      {
        Sid    = "AWSCloudTrailWrite"
        Effect = "Allow"
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        }
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.cloudtrail_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "s3:x-amz-acl" = "bucket-owner-full-control"
          }
        }
      }
    ]
  })
}

# GuardDuty for threat detection
resource "aws_guardduty_detector" "main" {
  enable = true
}

# Config for compliance monitoring
resource "aws_config_configuration_recorder" "main" {
  name     = "security-config-recorder"
  role_arn = aws_iam_role.config_role.arn
}

resource "aws_iam_role" "config_role" {
  name = "config-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "config.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "config_policy" {
  role       = aws_iam_role.config_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/ConfigRole"
}

# Outputs
output "security_group_id" {
  value = aws_security_group.web_sg.id
}

output "cloudtrail_arn" {
  value = aws_cloudtrail.security_trail.arn
}

output "guardduty_detector_id" {
  value = aws_guardduty_detector.main.id
}`
        },
        'aws-cicd': {
            title: 'GitHub Actions DevSecOps Pipeline',
            content: `# Complete DevSecOps CI/CD Pipeline

name: DevSecOps Security Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  AWS_REGION: us-east-1
  ECR_REGISTRY: ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.us-east-1.amazonaws.com

jobs:
  security-scan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
      actions: read
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    # SAST - Static Application Security Testing
    - name: Run Semgrep SAST
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/security-audit
          p/secrets
          p/owasp-top-ten
          p/security-audit
        generateSarif: "1"
        output: "semgrep-results.sarif"

    - name: Upload Semgrep results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: "semgrep-results.sarif"

    # Dependency vulnerability scanning
    - name: Run npm audit
      run: |
        npm audit --audit-level moderate --json > npm-audit.json || true
        if [ -s npm-audit.json ]; then
          echo "Vulnerabilities found in dependencies"
          cat npm-audit.json
        fi

    # Container image scanning
    - name: Build Docker image
      run: |
        docker build -t $ECR_REGISTRY/${{ github.repository }}:${{ github.sha }} .
        docker tag $ECR_REGISTRY/${{ github.repository }}:${{ github.sha }} $ECR_REGISTRY/${{ github.repository }}:latest

    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: '$ECR_REGISTRY/${{ github.repository }}:${{ github.sha }}'
        format: 'sarif'
        output: 'trivy-results.sarif'

    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'

    # Infrastructure scanning
    - name: Run Checkov
      uses: bridgecrewio/checkov-action@master
      with:
        directory: .
        framework: terraform
        output_format: sarif
        output_file_path: checkov-results.sarif

    - name: Upload Checkov results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'checkov-results.sarif'

  deploy:
    needs: security-scan
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ env.AWS_REGION }}

    - name: Login to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v2

    - name: Build and push image
      run: |
        docker build -t $ECR_REGISTRY/${{ github.repository }}:${{ github.sha }} .
        docker push $ECR_REGISTRY/${{ github.repository }}:${{ github.sha }}
        docker push $ECR_REGISTRY/${{ github.repository }}:latest

    - name: Deploy to ECS
      run: |
        aws ecs update-service \
          --cluster ${{ secrets.ECS_CLUSTER }} \
          --service ${{ secrets.ECS_SERVICE }} \
          --force-new-deployment

  security-notifications:
    needs: [security-scan, deploy]
    runs-on: ubuntu-latest
    if: always()
    
    steps:
    - name: Security Scan Results
      run: |
        echo "Security scan completed with status: ${{ needs.security-scan.result }}"
        echo "Deployment completed with status: ${{ needs.deploy.result }}"
        
        if [ "${{ needs.security-scan.result }}" != "success" ]; then
          echo "Security scan failed - check the Security tab for details"
        fi`
        },
        'azure-policy': {
            title: 'Azure Policy as Code',
            content: `# Azure Policy as Code for Security Compliance

# Policy Definition for Storage Account Encryption
resource "azurerm_policy_definition" "storage_encryption" {
  name         = "storage-encryption-policy"
  policy_type  = "Custom"
  mode         = "Indexed"
  display_name = "Storage Account Encryption Policy"
  description  = "Ensures all storage accounts have encryption enabled"

  policy_rule = jsonencode({
    "if" = {
      "allOf" = [
        {
          "field" = "type"
          "equals" = "Microsoft.Storage/storageAccounts"
        },
        {
          "field" = "Microsoft.Storage/storageAccounts/encryption.services.blob.enabled"
          "equals" = "false"
        }
      ]
    }
    "then" = {
      "effect" = "deny"
    }
  })
}

# Policy Assignment
resource "azurerm_policy_assignment" "storage_encryption_assignment" {
  name                 = "storage-encryption-assignment"
  scope                = data.azurerm_subscription.current.id
  policy_definition_id = azurerm_policy_definition.storage_encryption.id
  description          = "Assignment of storage encryption policy"
  display_name         = "Storage Encryption Assignment"
}

# Policy for Network Security Groups
resource "azurerm_policy_definition" "nsg_rule_restriction" {
  name         = "nsg-rule-restriction"
  policy_type  = "Custom"
  mode         = "Indexed"
  display_name = "NSG Rule Restriction Policy"
  description  = "Restricts certain NSG rules"

  policy_rule = jsonencode({
    "if" = {
      "allOf" = [
        {
          "field" = "type"
          "equals" = "Microsoft.Network/networkSecurityGroups"
        },
        {
          "anyOf" = [
            {
              "field" = "Microsoft.Network/networkSecurityGroups/securityRules[*].access"
              "equals" = "Allow"
            },
            {
              "field" = "Microsoft.Network/networkSecurityGroups/securityRules[*].destinationPortRange"
              "equals" = "*"
            }
          ]
        }
      ]
    }
    "then" = {
      "effect" = "audit"
    }
  })
}

# Initiative for Security Baseline
resource "azurerm_policy_set_definition" "security_baseline" {
  name         = "security-baseline"
  policy_type  = "Custom"
  display_name = "Security Baseline Initiative"
  description  = "Comprehensive security baseline for Azure resources"

  policy_definition_reference {
    policy_definition_id = azurerm_policy_definition.storage_encryption.id
  }

  policy_definition_reference {
    policy_definition_id = azurerm_policy_definition.nsg_rule_restriction.id
  }
}

# Assignment of the initiative
resource "azurerm_policy_assignment" "security_baseline_assignment" {
  name                 = "security-baseline-assignment"
  scope                = data.azurerm_subscription.current.id
  policy_definition_id = azurerm_policy_set_definition.security_baseline.id
  description          = "Assignment of security baseline initiative"
  display_name         = "Security Baseline Assignment"
}

# Data source for current subscription
data "azurerm_subscription" "current" {}

# Outputs
output "policy_definition_id" {
  value = azurerm_policy_definition.storage_encryption.id
}

output "initiative_id" {
  value = azurerm_policy_set_definition.security_baseline.id
}`
        },
        'azure-security': {
            title: 'Azure Security Center Automation',
            content: `# PowerShell script for Azure Security Center automation

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,
    
    [string]$Location = "East US"
)

# Connect to Azure
Write-Host "Connecting to Azure..." -ForegroundColor Green
Connect-AzAccount

# Set subscription context
Set-AzContext -SubscriptionId $SubscriptionId

# Function to get security recommendations
function Get-SecurityRecommendations {
    Write-Host "Fetching security recommendations..." -ForegroundColor Yellow
    
    $recommendations = Get-AzSecurityRecommendation | Where-Object {
        $_.State -eq "Active" -and $_.Severity -in @("High", "Medium")
    }
    
    return $recommendations
}

# Function to remediate security issues
function Invoke-SecurityRemediation {
    param($Recommendation)
    
    Write-Host "Remediating: $($Recommendation.DisplayName)" -ForegroundColor Cyan
    
    try {
        # Apply remediation based on recommendation type
        switch ($Recommendation.RecommendationType) {
            "EnableEncryptionAtRest" {
                # Enable encryption for storage accounts
                $storageAccounts = Get-AzStorageAccount -ResourceGroupName $ResourceGroupName
                foreach ($account in $storageAccounts) {
                    Set-AzStorageAccount -ResourceGroupName $ResourceGroupName -Name $account.StorageAccountName -EnableEncryptionService Blob,File
                }
            }
            "EnableNetworkSecurityGroup" {
                # Create NSG for subnets without protection
                $subnets = Get-AzVirtualNetwork | Get-AzVirtualNetworkSubnetConfig | Where-Object { -not $_.NetworkSecurityGroup }
                foreach ($subnet in $subnets) {
                    $nsg = New-AzNetworkSecurityGroup -ResourceGroupName $ResourceGroupName -Name "NSG-$($subnet.Name)" -Location $Location
                    $subnet.NetworkSecurityGroup = $nsg
                }
            }
            "EnableMFA" {
                # Enable MFA for users (requires Azure AD Premium)
                Write-Host "MFA should be enabled through Azure AD Conditional Access policies" -ForegroundColor Yellow
            }
            default {
                Write-Host "No automated remediation available for: $($Recommendation.RecommendationType)" -ForegroundColor Red
            }
        }
    }
    catch {
        Write-Error "Failed to remediate: $($_.Exception.Message)"
    }
}

# Function to create security alerts
function New-SecurityAlert {
    param(
        [string]$AlertName,
        [string]$Description,
        [string]$Severity = "Medium"
    )
    
    $alertRule = @{
        Name = $AlertName
        ResourceGroupName = $ResourceGroupName
        Location = $Location
        Description = $Description
        Severity = $Severity
        Enabled = $true
    }
    
    # Create action group for notifications
    $actionGroup = New-AzActionGroup -ResourceGroupName $ResourceGroupName -Name "SecurityAlerts" -ShortName "SecAlert"
    
    # Add email action
    $emailAction = New-AzActionGroupReceiver -Name "SecurityTeam" -EmailAddress "security@company.com"
    Add-AzActionGroupReceiver -ResourceGroupName $ResourceGroupName -Name "SecurityAlerts" -Receiver $emailAction
}

# Function to enable Security Center features
function Enable-SecurityCenterFeatures {
    Write-Host "Enabling Security Center features..." -ForegroundColor Green
    
    # Enable Just-In-Time VM access
    Set-AzJitNetworkAccessPolicy -ResourceGroupName $ResourceGroupName -Name "default" -Location $Location -VirtualMachine $vm.Id
    
    # Enable Adaptive Application Controls
    $adaptiveApplicationControls = @{
        ResourceGroupName = $ResourceGroupName
        Location = $Location
        GroupName = "Default"
        ProtectionMode = "Audit"
    }
    
    # Enable File Integrity Monitoring
    $vm = Get-AzVM -ResourceGroupName $ResourceGroupName | Select-Object -First 1
    if ($vm) {
        Set-AzVMExtension -ResourceGroupName $ResourceGroupName -VMName $vm.Name -Name "AzureSecurityCenter" -Publisher "Microsoft.Azure.Security.Monitoring" -Type "AzureSecurityCenter" -TypeHandlerVersion "1.0"
    }
}

# Main execution
Write-Host "Starting Azure Security Center automation..." -ForegroundColor Green

# Get security recommendations
$recommendations = Get-SecurityRecommendations

if ($recommendations.Count -gt 0) {
    Write-Host "Found $($recommendations.Count) security recommendations" -ForegroundColor Yellow
    
    foreach ($rec in $recommendations) {
        Write-Host "Processing: $($rec.DisplayName)" -ForegroundColor Cyan
        Invoke-SecurityRemediation -Recommendation $rec
    }
} else {
    Write-Host "No active security recommendations found" -ForegroundColor Green
}

# Enable Security Center features
Enable-SecurityCenterFeatures

# Create security alerts
New-SecurityAlert -AlertName "HighSeverityThreats" -Description "Alert for high severity security threats" -Severity "High"
New-SecurityAlert -AlertName "SuspiciousActivity" -Description "Alert for suspicious network activity" -Severity "Medium"

Write-Host "Azure Security Center automation completed!" -ForegroundColor Green`
        },
        'gcp-scc': {
            title: 'GCP Security Command Center Integration',
            content: `# Python script for GCP Security Command Center automation

import json
import time
from datetime import datetime, timedelta
from google.cloud import securitycenter
from google.cloud import asset
from google.cloud import monitoring_v3
from google.oauth2 import service_account

class GCPSecurityAutomation:
    def __init__(self, project_id, credentials_path=None):
        self.project_id = project_id
        self.org_id = f"organizations/{self.get_organization_id()}"
        
        # Initialize clients
        if credentials_path:
            credentials = service_account.Credentials.from_service_account_file(credentials_path)
            self.scc_client = securitycenter.SecurityCenterClient(credentials=credentials)
            self.asset_client = asset.AssetServiceClient(credentials=credentials)
            self.monitoring_client = monitoring_v3.MetricServiceClient(credentials=credentials)
        else:
            self.scc_client = securitycenter.SecurityCenterClient()
            self.asset_client = asset.AssetServiceClient()
            self.monitoring_client = monitoring_v3.MetricServiceClient()

    def get_organization_id(self):
        """Get organization ID from project"""
        # This would typically be retrieved from your organization
        return "123456789012"  # Replace with actual org ID

    def create_security_finding(self, source_id, finding_id, category, severity, description):
        """Create a new security finding in SCC"""
        finding = {
            "name": f"{self.org_id}/sources/{source_id}/findings/{finding_id}",
            "state": "ACTIVE",
            "resource_name": f"//compute.googleapis.com/projects/{self.project_id}/zones/us-central1-a/instances/example-instance",
            "category": category,
            "external_uri": f"https://console.cloud.google.com/security/command-center/findings?project={self.project_id}",
            "severity": severity,
            "event_time": {"seconds": int(time.time())},
            "source_properties": {
                "description": description,
                "detection_method": "Automated Script",
                "confidence": "HIGH"
            }
        }
        
        try:
            response = self.scc_client.create_finding(
                request={
                    "parent": f"{self.org_id}/sources/{source_id}",
                    "finding": finding
                }
            )
            print(f"Created finding: {response.name}")
            return response
        except Exception as e:
            print(f"Error creating finding: {e}")
            return None

    def list_active_findings(self, source_id):
        """List all active security findings"""
        try:
            findings = self.scc_client.list_findings(
                request={
                    "parent": f"{self.org_id}/sources/{source_id}",
                    "filter": "state=\"ACTIVE\""
                }
            )
            return list(findings)
        except Exception as e:
            print(f"Error listing findings: {e}")
            return []

    def remediate_finding(self, finding_name, remediation_action):
        """Remediate a security finding"""
        try:
            # Update finding state to resolved
            update_mask = {"paths": ["state"]}
            finding = {"name": finding_name, "state": "RESOLVED"}
            
            response = self.scc_client.update_finding(
                request={
                    "finding": finding,
                    "update_mask": update_mask
                }
            )
            print(f"Remediated finding: {finding_name}")
            return response
        except Exception as e:
            print(f"Error remediating finding: {e}")
            return None

    def create_security_policy(self, policy_name, description, rules):
        """Create a security policy"""
        policy = {
            "display_name": policy_name,
            "description": description,
            "rules": rules
        }
        
        try:
            response = self.scc_client.create_policy(
                request={
                    "parent": self.org_id,
                    "policy": policy
                }
            )
            print(f"Created policy: {response.name}")
            return response
        except Exception as e:
            print(f"Error creating policy: {e}")
            return None

    def scan_assets_for_vulnerabilities(self):
        """Scan GCP assets for security vulnerabilities"""
        try:
            # List all assets
            assets = self.asset_client.search_all_resources(
                request={
                    "scope": f"projects/{self.project_id}",
                    "asset_types": ["compute.googleapis.com/Instance"]
                }
            )
            
            vulnerabilities = []
            for asset in assets:
                # Check for common security issues
                if self.check_instance_security(asset):
                    vulnerabilities.append({
                        "asset": asset.name,
                        "issue": "Instance without proper security configuration",
                        "severity": "MEDIUM"
                    })
            
            return vulnerabilities
        except Exception as e:
            print(f"Error scanning assets: {e}")
            return []

    def check_instance_security(self, asset):
        """Check if an instance has proper security configuration"""
        # This is a simplified check - in reality, you'd check various security settings
        return True  # Placeholder

    def create_security_metrics(self):
        """Create custom security metrics in Cloud Monitoring"""
        try:
            # Create a custom metric for security findings
            metric_descriptor = {
                "type": "custom.googleapis.com/security/findings_count",
                "display_name": "Security Findings Count",
                "description": "Number of active security findings",
                "metric_kind": "GAUGE",
                "value_type": "INT64",
                "labels": [
                    {"key": "severity", "value_type": "STRING"},
                    {"key": "category", "value_type": "STRING"}
                ]
            }
            
            response = self.monitoring_client.create_metric_descriptor(
                request={
                    "name": f"projects/{self.project_id}",
                    "metric_descriptor": metric_descriptor
                }
            )
            print(f"Created metric descriptor: {response.name}")
            return response
        except Exception as e:
            print(f"Error creating metrics: {e}")
            return None

    def generate_security_report(self):
        """Generate a comprehensive security report"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "project_id": self.project_id,
            "findings": [],
            "recommendations": []
        }
        
        # Get all findings
        findings = self.list_active_findings("default")
        for finding in findings:
            report["findings"].append({
                "name": finding.name,
                "category": finding.category,
                "severity": finding.severity,
                "state": finding.state
            })
        
        # Generate recommendations
        report["recommendations"] = [
            "Enable Cloud Security Command Center Premium",
            "Implement Security Health Analytics",
            "Set up Event Threat Detection",
            "Configure Web Security Scanner",
            "Enable Container Threat Detection"
        ]
        
        return report

# Example usage
def main():
    project_id = "your-gcp-project-id"
    automation = GCPSecurityAutomation(project_id)
    
    # Create a security finding
    finding = automation.create_security_finding(
        source_id="default",
        finding_id="custom-finding-001",
        category="PII_DATA_ACCESS",
        severity="HIGH",
        description="Potential PII data access detected"
    )
    
    # Scan for vulnerabilities
    vulnerabilities = automation.scan_assets_for_vulnerabilities()
    print(f"Found {len(vulnerabilities)} potential vulnerabilities")
    
    # Generate security report
    report = automation.generate_security_report()
    print("Security Report:")
    print(json.dumps(report, indent=2))
    
    # Create security metrics
    automation.create_security_metrics()

if __name__ == "__main__":
    main()`
        }
    };

    const automation = automationScripts[automationId];
    if (!automation) return;

    // Create modal content
    const modalContent = `
        <div class="modal-header">
            <h2>${automation.title}</h2>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="code-block">
                <pre><code>${automation.content}</code></pre>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" onclick="downloadAutomation('${automationId}')">Download Script</button>
            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;

    // Update modal content
    document.getElementById('solutionModal').innerHTML = modalContent;
    document.getElementById('solutionModal').style.display = 'block';
}

// Download automation script
function downloadAutomation(automationId) {
    const automationScripts = {
        'aws-terraform': 'AWS Terraform Security Configuration',
        'aws-cicd': 'GitHub Actions DevSecOps Pipeline',
        'azure-policy': 'Azure Policy as Code',
        'azure-security': 'Azure Security Center Automation',
        'gcp-scc': 'GCP Security Command Center Integration'
    };

    const title = automationScripts[automationId];
    if (!title) return;

    // Create download content
    const content = document.querySelector('.code-block pre code').textContent;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${automationId}-script.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Download solution
function downloadSolution(solutionId) {
    const solution = solutionDatabase[solutionId];
    if (!solution) return;
    
    // Create a comprehensive PDF content
    const pdfContent = generatePDFContent(solution);
    downloadAsPDF(pdfContent, `${solutionId}-solution.pdf`);
}

function generatePDFContent(solution) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${solution.title}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                h2 { color: #1e293b; margin-top: 30px; }
                h3 { color: #475569; }
                .step { margin: 20px 0; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb; }
                .step-number { background: #2563eb; color: white; padding: 5px 10px; border-radius: 50%; display: inline-block; margin-right: 10px; }
                .tools { background: #e0f2fe; padding: 10px; border-radius: 5px; margin: 10px 0; }
                .architecture { background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 5px; font-family: monospace; white-space: pre; }
                .meta { background: #f1f5f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <h1>${solution.title}</h1>
            <p><strong>Description:</strong> ${solution.description}</p>
            
            <h2>Implementation Steps</h2>
            ${solution.steps.map(step => `
                <div class="step">
                    <h3><span class="step-number">${step.step}</span>${step.title}</h3>
                    <p><strong>Description:</strong> ${step.description}</p>
                    <div class="tools">
                        <strong>Tools & Services:</strong> ${step.tools.join(', ')}
                    </div>
                    <h4>Implementation Details:</h4>
                    <ul>
                        ${step.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
            
            <h2>Architecture Diagram</h2>
            <div class="architecture">${solution.architecture}</div>
            
            <div class="meta">
                <p><strong>Estimated Cost:</strong> ${solution.cost}</p>
                <p><strong>Timeline:</strong> ${solution.timeline}</p>
            </div>
            
            <footer style="margin-top: 50px; text-align: center; color: #64748b;">
                <p>Generated by CyberTarget.cloud - Professional Technology Solutions</p>
                <p>Visit us at: https://cybertarget.cloud</p>
            </footer>
        </body>
        </html>
    `;
}

function downloadAsPDF(content, filename) {
    // Create a new window with the content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

// Share solution
function shareSolution(solutionId) {
    const solution = solutionDatabase[solutionId];
    if (!solution) return;
    
    const url = `${window.location.origin}/ai-solutions.html#${solutionId}`;
    const shareText = `Check out this cybersecurity solution: ${solution.title}\n\n${url}\n\n#CyberSecurity #DevSecOps #CloudSecurity`;
    
    if (navigator.share) {
        navigator.share({
            title: solution.title,
            text: shareText,
            url: url
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(url, shareText);
        });
    } else {
        fallbackShare(url, shareText);
    }
}

function fallbackShare(url, shareText) {
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Solution link copied to clipboard! You can now share it on social media.');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Solution link copied to clipboard!');
    });
}

// Download architecture
function downloadArchitecture(archId) {
    const architecture = architectureDatabase[archId];
    if (!architecture) return;
    
    const pdfContent = generateArchitecturePDF(architecture);
    downloadAsPDF(pdfContent, `${archId}-architecture.pdf`);
}

function generateArchitecturePDF(architecture) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${architecture.title}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                h2 { color: #1e293b; margin-top: 30px; }
                h3 { color: #475569; }
                .component { margin: 15px 0; padding: 10px; background: #f8fafc; border-left: 3px solid #2563eb; }
                .phase { margin: 15px 0; padding: 10px; background: #e0f2fe; border-radius: 5px; }
                .architecture { background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 5px; font-family: monospace; white-space: pre; }
            </style>
        </head>
        <body>
            <h1>${architecture.title}</h1>
            <p><strong>Description:</strong> ${architecture.description}</p>
            
            <h2>Key Components</h2>
            ${architecture.components.map(component => `
                <div class="component">
                    <h3>${component}</h3>
                </div>
            `).join('')}
            
            <h2>Architecture Diagram</h2>
            <div class="architecture">${architecture.diagram}</div>
            
            <h2>Implementation Phases</h2>
            ${architecture.implementation.map(phase => `
                <div class="phase">
                    <h3>${phase}</h3>
                </div>
            `).join('')}
            
            <footer style="margin-top: 50px; text-align: center; color: #64748b;">
                <p>Generated by CyberTarget.cloud - Professional Technology Solutions</p>
                <p>Visit us at: https://cybertarget.cloud</p>
            </footer>
        </body>
        </html>
    `;
}

// Share architecture
function shareArchitecture(archId) {
    const url = `${window.location.origin}/ai-solutions.html#${archId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert('Architecture link copied to clipboard!');
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('solutionModal');
    if (event.target == modal) {
        modal.style.display = 'none';
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
        // Add animation to solution cards
        document.querySelectorAll('.solution-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to attack cards
        document.querySelectorAll('.attack-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to architecture cards
        document.querySelectorAll('.arch-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
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

const statsSection = document.querySelector('.quick-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}