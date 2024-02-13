export default function ApplicationTable({ id, status }: { id: string; status: string }) {
  return (
    <table className="border-separate border-spacing-2 border border-n-700">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Status</th>
        </tr>
        <tr>
          <td colSpan={2}>No applications found</td>
        </tr>
      </tbody>
    </table>
  )
}
