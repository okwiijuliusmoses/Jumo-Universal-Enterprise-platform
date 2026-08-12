import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
} from "./JumoAIProvider";

export class CopilotEngineeringProvider implements JumoAIProvider {
  readonly providerId = "copilot-engineering";
  readonly displayName = "JUMO Copilot Engineering Agent";
  readonly local = false;

  async isAvailable(): Promise<boolean> {
    return Boolean(
      process.env.JUMO_COPILOT_ENDPOINT?.trim(),
    );
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const endpoint =
      process.env.JUMO_COPILOT_ENDPOINT?.trim();

    if (!endpoint) {
      throw new Error(
        "JUMO Copilot engineering endpoint is not configured.",
      );
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.JUMO_COPILOT_TOKEN
          ? {
              Authorization:
                `Bearer ${process.env.JUMO_COPILOT_TOKEN}`,
            }
          : {}),
      },
      body: JSON.stringify({
        message: request.message,
        systemPrompt: request.systemPrompt,
        context: request.context,
        conversation: request.conversation,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Copilot engineering request failed: ${response.status}`,
      );
    }

    const data = (await response.json()) as {
      text?: string;
      output?: string;
    };

    return {
      text: data.text || data.output || "",
      modelId: "copilot-engineering",
      providerId: this.providerId,
      reasoning: true,
      metadata: {
        role: "ENGINEERING",
        authority: "JUMO_PRIMARY_AI",
      },
    };
  }
}
