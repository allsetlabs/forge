# TestResults

Display test results with summary statistics, progress bars, and collapsible test suites.

## Import

```tsx
import {
  TestResults,
  TestResultsHeader,
  TestResultsSummary,
  TestResultsDuration,
  TestResultsProgress,
  TestResultsContent,
  TestSuite,
  TestSuiteName,
  TestSuiteStats,
  TestSuiteContent,
  Test,
  TestStatus,
  TestName,
  TestDuration,
  TestError,
  TestErrorMessage,
  TestErrorStack,
} from '@allsetlabs/forge/components/ai-elements/test-results';
```

## Features

- **Summary Statistics**: Shows passed, failed, skipped counts with color-coded badges
- **Progress Bar**: Visual progress indicator with percentage
- **Collapsible Suites**: Group tests by suite with expand/collapse
- **Status Icons**: Visual indicators for passed, failed, skipped, running tests
- **Error Display**: Formatted error messages and stack traces
- **Duration**: Shows execution time for tests and suites

## Basic Usage

```tsx
<TestResults
  summary={{
    passed: 42,
    failed: 3,
    skipped: 1,
    total: 46,
    duration: 1234,
  }}
>
  <TestResultsHeader>
    <TestResultsSummary />
    <TestResultsDuration />
  </TestResultsHeader>
  <TestResultsProgress />
  <TestResultsContent>
    <TestSuite name="User Authentication" status="passed">
      <TestSuiteName />
      <TestSuiteContent>
        <Test name="should login successfully" status="passed" duration={23} />
        <Test name="should reject invalid credentials" status="passed" duration={15} />
      </TestSuiteContent>
    </TestSuite>
  </TestResultsContent>
</TestResults>
```

**Visual:**

> Bordered card with header showing "42 passed, 3 failed, 1 skipped" badges and "1.23s" duration. Green/red progress bar below. Expandable test suites with individual test results.

## Props

### TestResults

| Prop      | Type               | Default | Description             |
| --------- | ------------------ | ------- | ----------------------- |
| summary   | TestResultsSummary | -       | Overall test statistics |
| className | string             | -       | Additional CSS classes  |

### TestResultsSummary

```typescript
interface TestResultsSummary {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration?: number;
}
```

### TestSuite

| Prop      | Type       | Default | Description             |
| --------- | ---------- | ------- | ----------------------- |
| name      | string     | -       | Suite name (required)   |
| status    | TestStatus | -       | Suite status (required) |
| className | string     | -       | Additional CSS classes  |

### Test

| Prop      | Type                                           | Default | Description                   |
| --------- | ---------------------------------------------- | ------- | ----------------------------- |
| name      | string                                         | -       | Test name (required)          |
| status    | 'passed' \| 'failed' \| 'skipped' \| 'running' | -       | Test status (required)        |
| duration  | number                                         | -       | Test duration in milliseconds |
| className | string                                         | -       | Additional CSS classes        |

## Examples

### Example 1: Complete Test Report

```tsx
<TestResults summary={{ passed: 8, failed: 2, skipped: 1, total: 11, duration: 523 }}>
  <TestResultsHeader>
    <TestResultsSummary />
    <TestResultsDuration />
  </TestResultsHeader>
  <TestResultsProgress />
  <TestResultsContent>
    <TestSuite name="API Tests" status="failed">
      <TestSuiteName />
      <TestSuiteStats passed={2} failed={1} />
      <TestSuiteContent>
        <Test name="GET /users" status="passed" duration={45} />
        <Test name="POST /users" status="failed" duration={67}>
          <TestError>
            <TestErrorMessage>Expected status 201, received 500</TestErrorMessage>
            <TestErrorStack>
              at validateResponse (api.test.ts:23:10) at Test.run (api.test.ts:45:5)
            </TestErrorStack>
          </TestError>
        </Test>
        <Test name="DELETE /users/:id" status="passed" duration={32} />
      </TestSuiteContent>
    </TestSuite>
  </TestResultsContent>
</TestResults>
```

**Visual:**

> Full test report with failed test showing error message and stack trace in red background.

### Example 2: Running Tests

```tsx
<TestResults summary={{ passed: 5, failed: 0, skipped: 0, total: 10, duration: 234 }}>
  <TestResultsHeader>
    <TestResultsSummary />
    <TestResultsDuration />
  </TestResultsHeader>
  <TestResultsContent>
    <TestSuite name="Component Tests" status="running">
      <TestSuiteName />
      <TestSuiteContent>
        <Test name="renders correctly" status="passed" duration={12} />
        <Test name="handles click events" status="running" />
        <Test name="validates props" status="skipped" />
      </TestSuiteContent>
    </TestSuite>
  </TestResultsContent>
</TestResults>
```

**Visual:**

> Active test suite with pulsing blue icon on running test, skipped test shown with gray icon.

### Example 3: With Custom Summary

```tsx
<TestResults summary={{ passed: 100, failed: 0, skipped: 5, total: 105, duration: 4567 }}>
  <TestResultsHeader>
    <div className="flex items-center gap-2">
      <CheckCircleIcon className="size-5 text-green-600" />
      <span className="font-semibold">All Tests Passed!</span>
    </div>
    <TestResultsDuration />
  </TestResultsHeader>
  <TestResultsProgress />
</TestResults>
```

**Visual:**

> Success message with green checkmark, custom header, and progress bar showing 95% completion.

### Example 4: Minimal Test List

```tsx
<TestResultsContent>
  <Test name="should validate email" status="passed" duration={5} />
  <Test name="should validate password" status="passed" duration={7} />
  <Test name="should validate phone" status="failed" duration={12}>
    <TestError>
      <TestErrorMessage>Invalid phone format</TestErrorMessage>
    </TestError>
  </Test>
</TestResultsContent>
```

**Visual:**

> Simple list of tests without suites, showing pass/fail status with icons.

## Notes

- Status colors: green (passed), red (failed), yellow (skipped), blue (running)
- Progress bar shows passed (green) and failed (red) percentages
- Duration automatically formats: <1000ms shows "ms", >=1000ms shows "s"
- Test suites are collapsible via Radix UI Collapsible
- Error backgrounds use red-50/red-900 for light/dark modes
- Status icons: CheckCircle (passed), XCircle (failed), Circle (skipped), CircleDot (running)
- Running tests show pulsing animation
- Stack traces use monospace font and scrollable container
