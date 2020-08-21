module Commands.Interactive.QuestionOptions exposing
    ( errorTypeHint
    , exit
    , explanation
    , lineHint
    , resetAndExit
    , solved
    , tryAgain
    )


tryAgain : String
tryAgain =
    "Break the file again a different way."


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
