import fs from 'fs'
import Main from '../js/main.js'

describe('break command', () => {
  describe('case swapping', () => {
    beforeEach(() => {
      createCaseSwapExampleFile()
      process.argv[2] == 'case_swap_test_file.txt'
      process.argv[3] == 'break'
      Main.run()
    })

    test('breaks file', () => {
      const content = "fs.readFileSync('case_swap_test_file.txt', 'utf8')"

      expect(content).toEqual('Test')
    })
  })
})

function createCaseSwapExampleFile() {
  fs.writeFileSync("case_swap_test_file.txt", "test", function (err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}