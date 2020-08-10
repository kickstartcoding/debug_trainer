export default function (program): void {
  program.ports.exitSuccess.subscribe((): void => process.exit(0))
}