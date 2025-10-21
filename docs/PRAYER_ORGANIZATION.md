# Prayer Organization

Prayers are organized using a flexible **multi-label classification system** that allows prayers to belong to multiple categories simultaneously.

## Primary Categories

Each prayer has one primary theological focus:

- **`penitential`** - Prayers of repentance and confession (Act of Contrition, Confiteor)
- **`seasonal`** - Prayers for specific liturgical seasons (Advent Antiphons, Christmas Prayer)
- **`marian`** - Prayers to the Virgin Mary (Hail Mary, Angelus, Memorare, Hail Holy Queen)
- **`christological`** - Prayers focused on Jesus Christ (Our Father, Jesus Prayer)
- **`creeds`** - Statements of faith (Apostles' Creed)
- **`liturgical`** - Formal liturgical prayers (Glory Be, Te Deum)
- **`devotional`** - Private devotional prayers (Divine Mercy Chaplet)
- **`holy-spirit`** - Prayers to the Holy Spirit (Come Holy Spirit, Veni Creator Spiritus)
- **`for-the-dead`** - Prayers for the deceased (Eternal Rest, Prayer for the Dead)
- **`daily`** - Prayers for daily recitation (Morning Offering, Evening Prayer)
- **`saints`** - Prayers for saint intercession (St. Michael Prayer, Litany of Loreto)

## Labels

Prayers can have multiple labels for flexible classification. **Labels are free-form** and can be customized for each prayer. Below are commonly used labels, but contributors are encouraged to create new labels as needed (using kebab-case format):

### Common Labels

- **`core`** - Essential prayers every Catholic should know
- **`essential`** - Prayers of highest liturgical importance  
- **`common`** - Widely known prayers
- **`devotional`** - Private devotional prayers
- **`daily`** - Prayers for daily recitation
- **`rosary`** - Prayers used in the Rosary
- **`mass`** - Prayers used in the Mass
- **`protection`** - Prayers for spiritual protection
- **`marian`** - Related to Mary
- **`christological`** - Related to Christ
- **`saints`** - Related to saints
- **`penitential`** - Related to repentance
- **`liturgical`** - Formal liturgical use
- **`creeds`** - Statements of faith
- **`holy-spirit`** - Related to the Holy Spirit
- **`for-the-dead`** - Prayers for the deceased
- **`evening`** - Evening prayers
- **`morning`** - Morning prayers
- **`mercy`** - Mercy-focused prayers
- **`chaplet`** - Chaplet prayers
- **`angels`** - Angel-related prayers
- **`seasonal`** - Seasonal prayers (Advent, Christmas, Lent, Easter)
- **`meals`** - Prayers before/after meals
- **`family`** - Family prayers
- **`contemplative`** - Contemplative prayers
- **`eastern`** - Eastern Catholic traditions
- **`litany`** - Litany prayers
- **`petition`** - Petition prayers
- **`intercession`** - Intercessory prayers
- **`peace`** - Peace prayers
- **`franciscan`** - Franciscan spirituality
- **`praise`** - Prayers of praise

> **Note**: This list is not exhaustive. Contributors can create new labels as needed to best describe each prayer. Labels must follow kebab-case format (e.g., `my-new-label`).

## Importance Levels

- **`essential`** - Core prayers of fundamental importance
- **`common`** - Standard prayers in regular use
- **`devotional`** - Optional prayers for personal devotion

## Classification Examples

- **Our Father**: `christological` + `["core", "essential", "christological", "daily", "rosary", "mass"]`
- **Hail Mary**: `marian` + `["core", "essential", "marian", "rosary", "daily"]`
- **St. Michael Prayer**: `saints` + `["saints", "protection", "common"]`

## Language Codes

The project uses ISO 639-1 language codes:

- `la` - Latin (original liturgical language)
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `pl` - Polish

## Prayer Reference

See [lib/prayer-index.json](../lib/prayer-index.json) for all available prayers and their classifications.
