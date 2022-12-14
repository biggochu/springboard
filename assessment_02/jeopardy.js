/*
- The game board should be 6 categories across, 5 question down, displayed in a table. Above this should be a header row with the name of each category.
- At the start of the game, you should randomly pick 6 categories from the jService API. For each category, you should randomly select 5 questions for that category.
- Initially, the board should show with ? on each spot on the board (on the real TV show, it shows dollar amount, but we won’t implement this).
- When the user clicks on a clue ?, it should replace that with the question text.
- When the user clicks on a visible question on the board, it should change to the answer (if they click on a visible answer, nothing should happen)
- When the user clicks the “Restart” button at the bottom of the page, it should load new categories and questions.
*/

window.scrollTo({ top: 0 })

class Jeopardy {
  constructor() {
    this.categories = []
    this.curCategories = []
    this.clues = {}
    this.numOfCategoryLoads = 0
    this.$startBtn = $('#start')
    this.$resetBtn = $('#reset')
    this.$thead = $('thead')
    this.$tbody = $('tbody')

    this.initialize()
  }

  initialize() {
    this.$startBtn.attr('disabled', true)

    Promise.resolve(this.loadCategories())
      .then(() => this.setGameBoard())

    this.$startBtn.on('click', e => {
      const $wrapper = $('.wrapper')
      $wrapper.css('margin-left', '-100%')
      setTimeout(() => $(document.body).addClass('game-start'), 800)
    })

    this.$resetBtn.on('click', e => {
      document.body.classList.add('loading')
      this.setGameBoard()
    })

    this.$tbody.on('click', 'td', e => {
      const td = e.target
      const $td = $(td)
      const category = +$td.data('category')
      const offset = $td.data('question')

      if (td.classList.length === 0) {
        td.classList.add('question')
        $td.html(this.clues[category][offset].question)
      } else if (td.classList.contains('question')) {
        td.classList.replace('question', 'answer')
        $td.html(this.clues[category][offset].answer)
      }
    })
  }

  async loadCategories() {
    const res = await axios.get('http://jservice.io/api/categories', {
      params: {
        count: 100,
        offset: this.numOfCategoryLoads * 100
      }
    })
    this.categories.push(..._.shuffle(res.data.filter(x => x.clues_count >= 5)))
    this.numOfCategoryLoads++
    return res
  }

  async loadClues(categories) {
    this.clues = {}
    for (const category of categories) {
      const res = await axios.get('http://jservice.io/api/clues', {
        params: { category: category.id }
      })
      this.clues[category.id] = res.data
    }
    this.$startBtn.attr('disabled', false)
    document.body.classList.remove('loading')
  }

  setGameBoard() {
    this.curCategories = [...this.categories.slice(0, 6)]
    this.categories = [...this.categories.slice(6)]

    this.renderCategories()
    this.renderTable()

    this.loadClues(this.curCategories)

    if (this.categories.length < 10) {
      this.loadCategories()
    }
  }

  renderTable() {
    const rows = []

    for (let i = 0; i < 5; i++) {
      rows[i] = $('<tr>')
      const cells = []

      for (let j = 0; j < 6; j++) {
        const $cell = $('<td>').text(`Question ${i+1}`)
        const category = this.curCategories[j]

        $cell.attr('height', '160')
        $cell.data('category', category.id)
        $cell.data('question', i)
        cells.push($cell)
      }

      rows[i].append(...cells)
    }

    this.$tbody.empty().append(...rows)
  }

  renderCategories() {
    const $row = $('<tr>')
    const cells = []

    this.curCategories.forEach(category => {
      cells.push($('<th>').text(category.title))
    })
    $row.append(...cells)
    this.$thead.empty().append($row)
  }

  reset() {

  }
}

const game = new Jeopardy()