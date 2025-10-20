# Pending Prayers

This document lists prayers planned for future releases of the @codexcommunion/prayer-collection package.

## Marian Prayers (`marian`)

### High Priority
- [ ] **Regina Caeli** - Easter season antiphon to Mary (labels: `["marian", "liturgical", "seasonal", "common"]`)
- [ ] **Alma Redemptoris Mater** - Advent/Christmas season Marian antiphon (labels: `["marian", "liturgical", "seasonal", "common"]`)
- [ ] **Ave Regina Caelorum** - Lenten season Marian antiphon (labels: `["marian", "liturgical", "seasonal", "common"]`)
- [ ] **Sub Tuum Praesidium** - Ancient prayer seeking Mary's protection (labels: `["marian", "protection", "ancient", "common"]`)

### Medium Priority
- [ ] **Litany of Loreto** - Traditional litany of invocations to Mary (labels: `["marian", "litany", "devotional", "common"]`)
- [ ] **Salve Regina** - Traditional Marian antiphon (labels: `["marian", "liturgical", "common"]`)

## Christological Prayers (`christological`)

### High Priority
- [ ] **Anima Christi** - Prayer for spiritual communion with Christ (labels: `["christological", "eucharistic", "devotional", "common"]`)
- [ ] **Jesus Prayer** - Eastern Christian prayer of the heart (labels: `["christological", "contemplative", "eastern", "common"]`)

### Medium Priority
- [ ] **Prayer Before Crucifix** - Meditation before the cross of Christ (labels: `["christological", "devotional", "passion"]`)
- [ ] **Litany of the Sacred Heart** - Devotional prayer to the Sacred Heart (labels: `["christological", "litany", "devotional"]`)

## Holy Spirit Prayers (`holy-spirit`)

### High Priority
- [ ] **Veni Creator Spiritus** - Ancient hymn invoking the Holy Spirit (labels: `["holy-spirit", "liturgical", "ancient", "essential"]`)
- [ ] **Come Holy Spirit** - Prayer for the gifts of the Holy Spirit (labels: `["holy-spirit", "devotional", "common"]`)

## Saints Prayers (`saints`)

### High Priority
- [ ] **Prayer to St. Joseph** - Prayer to the patron of the universal Church (labels: `["saints", "joseph", "common"]`)
- [ ] **Prayer to Guardian Angel** - Prayer for angelic protection and guidance (labels: `["saints", "angels", "protection", "common"]`)

### Medium Priority
- [ ] **Prayer to St. Anthony** - For finding lost things (labels: `["saints", "anthony", "devotional", "common"]`)
- [ ] **Prayer to St. Jude** - Patron of hopeless causes (labels: `["saints", "jude", "devotional"]`)

## Penitential Prayers (`penitential`)

### High Priority
- [ ] **Act of Faith** - Expression of belief in God and divine truth (labels: `["penitential", "virtues", "essential"]`)
- [ ] **Act of Hope** - Expression of trust in God's promises (labels: `["penitential", "virtues", "essential"]`)
- [ ] **Act of Love** - Expression of love for God and neighbor (labels: `["penitential", "virtues", "essential"]`)

### Medium Priority
- [ ] **Confiteor** - Liturgical prayer of confession (labels: `["penitential", "liturgical", "mass", "common"]`)

## Daily Prayers (`daily`)

### High Priority
- [ ] **Morning Offering** - Consecration of the day to God (labels: `["daily", "morning", "devotional", "common"]`)
- [ ] **Evening Prayer** - Prayer of gratitude and examination (labels: `["daily", "evening", "devotional", "common"]`)

### Medium Priority
- [ ] **Grace Before Meals** - Blessing before eating (labels: `["daily", "meals", "family", "common"]`)
- [ ] **Grace After Meals** - Thanksgiving after eating (labels: `["daily", "meals", "family", "common"]`)

## Liturgical Prayers (`liturgical`)

### High Priority
- [ ] **Te Deum** - Ancient hymn of praise (labels: `["liturgical", "ancient", "praise", "common"]`)
- [ ] **Magnificat** - Canticle of Mary (Luke 1:46-55) (labels: `["liturgical", "marian", "biblical", "essential"]`)

### Medium Priority
- [ ] **Canticle of Zechariah** - Benedictus (Luke 1:68-79) (labels: `["liturgical", "biblical", "morning", "common"]`)
- [ ] **Canticle of Simeon** - Nunc Dimittis (Luke 2:29-32) (labels: `["liturgical", "biblical", "evening", "common"]`)

## Devotional Prayers (`devotional`)

### High Priority
- [ ] **Divine Mercy Chaplet** - Prayer based on St. Faustina's revelations (labels: `["devotional", "mercy", "chaplet", "common"]`)
- [ ] **Chaplet of St. Michael** - Nine choirs of angels devotion (labels: `["devotional", "angels", "protection", "chaplet"]`)

### Medium Priority
- [ ] **Fatima Prayer** - Prayer taught by Our Lady of Fatima (labels: `["devotional", "marian", "fatima", "rosary"]`)
- [ ] **Prayer of St. Francis** - "Lord, make me an instrument of your peace" (labels: `["devotional", "peace", "franciscan"]`)

## For the Dead (`for-the-dead`)

### Medium Priority
- [ ] **Prayer for the Dead** - Intercession for souls in purgatory (labels: `["for-the-dead", "intercession", "common"]`)
- [ ] **Eternal Rest** - Prayer for the repose of souls (labels: `["for-the-dead", "brief", "common"]`)

## Special Seasons (`seasonal`)

### Medium Priority
- [ ] **Advent Antiphons** - O Come, O Come Emmanuel variations (labels: `["seasonal", "advent", "liturgical", "ancient"]`)
- [ ] **Christmas Prayer** - Celebration of the Nativity (labels: `["seasonal", "christmas", "devotional"]`)
- [ ] **Lenten Prayer** - Prayer for spiritual renewal (labels: `["seasonal", "lent", "penitential"]`)
- [ ] **Easter Prayer** - Celebration of the Resurrection (labels: `["seasonal", "easter", "liturgical"]`)

---

## Contributing New Prayers

If you'd like to contribute any of these prayers or suggest additional ones:

1. Check the [current prayer collection](lib/prayer-index.json) to avoid duplicates
2. Follow the [JSON schema structure](prayers/) used by existing prayers
3. Ensure all 8 supported languages are included: `la`, `en`, `es`, `fr`, `de`, `it`, `pt`, `pl`
4. Add appropriate metadata including `primary_category`, `labels`, and `importance`
5. Submit a pull request with the new prayer file

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).