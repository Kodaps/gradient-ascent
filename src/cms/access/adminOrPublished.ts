import type { Access } from "payload"

export const adminOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    throw new Error("Implement admin access")
    return true
  }

  return {
    _status: {
      equals: "published",
    },
  }
}
