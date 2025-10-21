# Contributing to Prayer Collection

Thank you for your interest in contributing to the Catholic Prayer Collection! This project aims to provide accurate, respectful, and comprehensive traditional Catholic prayers in multiple languages.

## 🙏 Sacred Content Guidelines

Before contributing, please remember that these are sacred prayers from the Catholic tradition. All contributions should:

- **Respect the sacred nature** of the content
- **Maintain liturgical accuracy** when possible
- **Use traditional, widely-accepted translations**
- **Preserve the theological integrity** of the prayers
- **Follow established Catholic terminology**

## 📋 How to Contribute

### 1. Prayer Requests
Use the "New Prayer Request" issue template to suggest prayers for addition to the collection.

**What we're looking for:**
- Traditional Catholic prayers in common use
- Prayers with established liturgical or devotional significance
- Prayers that are in the public domain
- Prayers with reliable historical documentation

**What we're not looking for:**
- Modern compositions without traditional usage
- Prayers from non-Catholic traditions
- Copyrighted materials
- Experimental or unofficial prayer texts

### 2. Translation Contributions
Use the "Translation Request" issue template to suggest translation improvements.

**Translation Standards:**
- Use liturgically approved translations when available
- Maintain consistency with Catholic terminology
- Preserve the prayer's theological meaning
- Include source references where possible

### 3. Bug Reports
Use the "Bug Report" issue template for:
- JSON format errors
- API functionality issues
- Documentation problems
- Build or packaging issues

## 🔧 Development Setup

### Prerequisites
- Node.js 12.0.0 or higher
- Git

### Setup
```bash
git clone https://github.com/codexcommunion/prayer-collection.git
cd prayer-collection
npm install
```

### Development Commands
```bash
# Build the project
npm run build

# Validate all prayer files
npm run validate

# Run tests
npm test

# Run all checks (used before publishing)
npm run prepublishOnly
```

## 📁 Project Structure

```
prayer-collection/
├── prayers/
│   ├── core/           # Fundamental prayers
│   ├── creeds/         # Statements of faith
│   ├── marian/         # Prayers to Mary
│   ├── saints/         # Prayers to saints
│   └── ...            # Other categories
├── scripts/           # Build and validation scripts
├── index.js          # Main API entry point
├── index.d.ts        # TypeScript definitions
└── README.md         # Documentation
```

## 📝 Adding a New Prayer

### 1. Create the JSON file
Place the file in the appropriate category directory:
```
prayers/[category]/[prayer-id].json
```

### 2. JSON Structure
```json
{
  "metadata": {
    "id": "prayer-id",
    "title": "Prayer Title",
    "category": "category-name",
    "type": "devotional|liturgical|scriptural",
    "description": "Brief description",
    "origin": "Historical origin",
    "origin_date": "Date in ISO format",
    "usage": "When/how it's used",
    "feast_days": ["associated-feasts"],
    "devotions": ["associated-devotions"],
    "created_date": "2025-07-14",
    "last_modified": "2025-07-14"
  },
  "translations": {
    "la": {
      "language": "Latin",
      "text": "Latin text",
      "notes": "Optional notes"
    },
    "en": {
      "language": "English",
      "text": "English text",
      "notes": "Optional notes"
    }
    // ... other languages
  }
}
```

### 3. Naming Conventions
- **File names**: Use kebab-case (e.g., `our-father.json`)
- **IDs**: Match the filename without extension
- **Categories**: Use existing category names

### 4. Required Fields
- `metadata.id`, `metadata.title`, `metadata.category`
- `translations.la` (Latin text)
- `translations.en` (English text)

### 5. Date Formats
Use ISO 8601 format for `origin_date`:
- Ranges: `"1200/1300"`
- Approximate: `"~1200"`
- Exact: `"1886"`

## 🔍 Validation

All prayers must pass validation:

```bash
npm run validate
```

This checks:
- JSON syntax
- Required fields
- ID/filename consistency
- Category consistency
- Date format validity

## 🧪 Testing

Run tests to ensure the API works correctly:

```bash
npm test
```

## 📦 Pull Request Process

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/prayer-name`)
3. **Add your prayer** following the guidelines above
4. **Run validation** (`npm run validate`)
5. **Run tests** (`npm test`)
6. **Commit your changes** with a clear message
7. **Push to your fork** (`git push origin feature/prayer-name`)
8. **Create a Pull Request**

### PR Requirements
- All validation checks must pass
- Include a clear description of what was added/changed
- Reference any related issues
- For prayer additions, include source/reference information

## 🎖️ Recognition

Contributors will be acknowledged in:
- Git commit history
- Release notes for significant contributions
- Special recognition for substantial prayer additions or improvements

## 📞 Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Use the Bug Report issue template
- **Prayer requests**: Use the Prayer Request issue template
- **Translation help**: Use the Translation Request issue template

## 📜 License

By contributing, you agree that your contributions will be licensed under the CodexCommunion Digital Code License (CCCL) v1.0. Note that while the code and data structures are CCCL licensed, the prayer content itself consists of traditional Catholic prayers that are in the public domain.

## 🙏 Thank You

Thank you for helping preserve and share these sacred prayers with the world. Your contributions help make Catholic prayer resources more accessible to developers and the faithful worldwide.

---

*"Pray for us sinners, now and at the hour of our death. Amen."*
