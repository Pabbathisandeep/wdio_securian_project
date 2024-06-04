import got from 'got';
import fs from 'fs';

export class ADOIntegration {
  private static organizationName = 'theskyhive';
  private static project = 'Development';
  private static pat = process.env.TOKEN;
  private static token =
    typeof this.pat === 'string'
      ? Buffer.from(this.pat).toString('base64')
      : undefined;

  private static request(
    method?,
    url?: string | undefined,
    headers?,
    searchParams?,
    json?
  ) {
    return got({
      method,
      url,
      headers,
      searchParams,
      json,
    });
  }

  public static async getTestSuiteIdByTestCaseId(testCaseId: number) {
    const response = await this.request(
      'GET',
      `https://dev.azure.com/${this.organizationName}/_apis/testplan/suites?testCaseId=${testCaseId}&api-version=7.1-preview.1`,
      {
        Authorization: `Basic ${this.token}`,
      }
    );
    const body = await JSON.parse(response.body);
    const suiteIdsArray = await body.value.map((suite) => suite.id);
    return Math.max(...suiteIdsArray);
  }

  public static async getPointId(
    planId: number,
    suiteId: number,
    testCaseId: number
  ) {
    const response = await this.request(
      'GET',
      `https://dev.azure.com/${this.organizationName}/${this.project}/_apis/test/Plans/${planId}/Suites/${suiteId}/points?api-version=5.1&testCaseId=${testCaseId}&$top=1`,
      {
        Authorization: `Basic ${this.token}`,
      }
    );
    const body = await JSON.parse(response.body);
    const pointId = body.value[0].id;
    return pointId;
  }

  public static async setTestResultAndGetRunId(
    planId: number,
    suiteId: number,
    pointId: number,
    status: string
  ) {
    let outcome: number;
    switch (status) {
      case 'PASSED':
        outcome = 2;
        break;
      case 'FAILED':
        outcome = 3;
        break;
      default:
        throw Error(
          `setTestResult: invalid status "${status}". Possible values: PASSED/FAILED`
        );
    }
    const response = await this.request(
      'PATCH',
      `https://dev.azure.com/${this.organizationName}/${this.project}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestPoint`,
      {
        Authorization: `Basic ${this.token}`,
      },
      {
        includePointDetails: true,
        returnIdentityRef: true,
        'api-version': '7.1-preview.2',
      },
      [
        {
          id: pointId,
          results: {
            outcome: await outcome,
          },
        },
      ]
    );
    const body = await JSON.parse(response.body);
    const lastTestRunId = await body.value[0].results.lastTestRunId;
    return lastTestRunId;
  }

  private static async getImageAsBase64Stream(path) {
    const promise = fs.promises.readFile(path);

    return await Promise.resolve(promise).then(function (buffer) {
      return Buffer.from(buffer).toString('base64');
    });
  }

  public static async sendTestResultAttachment(
    runId,
    testCaseResultId,
    fileName,
    path
  ) {
    await this.request(
      'POST',
      `https://vstmr.dev.azure.com/${this.organizationName}/${this.project}/_apis/testresults/runs/${runId}/Results/${testCaseResultId}/attachments`,
      {
        Authorization: `Basic ${this.token}`,
      },
      {
        'api-version': '7.1-preview.1',
      },
      {
        attachmentType: 'GeneralAttachment',
        comment: 'failure screenshot',
        fileName,
        stream: await this.getImageAsBase64Stream(path),
      }
    );
  }

  public static async updateTestResult(runId, stackTrace, steps) {
    await this.request(
      'PATCH',
      `https://dev.azure.com/${this.organizationName}/${this.project}/_apis/test/Runs/${runId}/results`,
      {
        Authorization: `Basic ${this.token}`,
      },
      {
        'api-version': '7.1-preview.6',
      },
      [
        {
          id: 100000,
          comment: 'initial comment for Analysis section',
          customFields: [
            {
              fieldName: 'errorMessage',
              value: steps,
            },
            {
              fieldName: 'stackTrace',
              value: stackTrace,
            },
          ],
        },
      ]
    );
  }
}
