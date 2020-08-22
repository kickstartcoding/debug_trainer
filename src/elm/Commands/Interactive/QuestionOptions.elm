module Commands.Interactive.QuestionOptions exposing
    ( breakADifferentFile
    , changeBreakCount
    , errorTypeHint
    , exit
    , explanation
    , lineHint
    , resetAndExit
    , solved
    , tryAgain
    )


breakADifferentFile : String
breakADifferentFile =
    "Break a different file."


tryAgain : String
tryAgain =
    "Break the same file again a different way."


changeBreakCount : String
changeBreakCount =
    "Change the number of changes to make next time."


exit : String
exit =
    "Exit."


solved : String
solved =
    "I solved it!"


lineHint : String
lineHint =
    "Tell me what line the break was on."


errorTypeHint : String
errorTypeHint =
    "Tell me what type of error you added."


explanation : String
explanation =
    "Tell me exactly what you did to the file."


resetAndExit : String
resetAndExit =
    "Reset the file and exit."
