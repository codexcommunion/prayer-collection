# Documentation Index

Quick reference guide to the prayer-collection documentation structure.

## Main Documentation

### README.md
**Purpose**: Quick start guide and overview  
**Contents**: Installation, basic usage examples, key features, links to detailed docs

### docs/PRAYER_ORGANIZATION.md
**Purpose**: Classification system reference  
**Contents**: 
- Primary categories (11 theological focuses)
- Labels (40+ classification tags)
- Importance levels
- Language codes
- Classification examples

### docs/DATA_STRUCTURE.md
**Purpose**: JSON schema and data format  
**Contents**:
- Complete JSON structure
- Metadata field definitions
- Translation fields
- Content structure for prayer references
- Speaker roles in liturgical dialogue

### docs/API_REFERENCE.md
**Purpose**: Complete API documentation  
**Contents**:
- All function signatures
- Usage examples for each function
- TypeScript type definitions
- Parameter descriptions
- Return value types

### docs/USAGE_EXAMPLES.md
**Purpose**: Framework-specific code examples  
**Contents**:
- Node.js/JavaScript examples
- TypeScript examples
- React examples (including hooks)
- Vue.js examples (Composition & Options API)

### docs/ARCHITECTURE.md
**Purpose**: Implementation and build system  
**Contents**:
- Universal compatibility architecture
- Build pipeline details
- Performance optimizations
- File structure
- Development workflow
- Publishing process
- Troubleshooting guide

## Additional Resources

### CONTRIBUTING.md
Guidelines for contributing to the project

### TESTING.md
Information about running tests and validation

### SCHEMA.md
JSON Schema documentation for validation and IDE support

### pending_prayers.md
List of prayers planned for future releases

### lib/prayer-index.json
Generated file listing all available prayers with metadata

### prayer-schema.json
Formal JSON Schema (Draft 7) for prayer data validation

## Quick Navigation

### For Users
1. Start with **README.md** for installation and quick start
2. Check **docs/USAGE_EXAMPLES.md** for your framework
3. Reference **docs/API_REFERENCE.md** for specific functions
4. See **docs/PRAYER_ORGANIZATION.md** for available prayers and categories

### For Contributors
1. Read **CONTRIBUTING.md** for guidelines
2. Study **docs/DATA_STRUCTURE.md** for JSON format
3. Review **docs/ARCHITECTURE.md** for build system
4. Check **pending_prayers.md** for what needs to be added

### For Developers
1. Start with **README.md** overview
2. Read **docs/ARCHITECTURE.md** for implementation details
3. Reference **docs/API_REFERENCE.md** for types and functions
4. See **docs/USAGE_EXAMPLES.md** for integration patterns

## File Organization

```
prayer-collection/
├── README.md                          # Main entry point
├── docs/
│   ├── PRAYER_ORGANIZATION.md        # Classification system
│   ├── DATA_STRUCTURE.md             # JSON schema
│   ├── API_REFERENCE.md              # Complete API docs
│   ├── USAGE_EXAMPLES.md             # Code examples
│   └── ARCHITECTURE.md               # Implementation details
├── CONTRIBUTING.md                    # Contribution guidelines
├── TESTING.md                        # Testing guide
└── pending_prayers.md                # Future additions
```
