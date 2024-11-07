import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters(); // Clear the default console reporter
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: true, // Affiche les traces d'erreur complètes
    },
  })
);
