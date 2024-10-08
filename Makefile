code-style-check:
	npx prettier --check --log-level debug .

code-style-fix:
	npx prettier --write .

lint-check:
	npx eslint .

run-test-headless:
	npx playwright test funda-website.spec.js

run-test-ui:
	npx playwright test funda-website.spec.js --ui --headed

debug-test-ui:
	npx playwright test funda-website.spec.js --ui --headed --debug

