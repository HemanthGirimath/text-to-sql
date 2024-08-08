import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface SQLResultTableProps {
  data: any[];
}

const SQLResultTable: React.FC<SQLResultTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Array.from(new Set(data.flatMap(Object.keys)));

  const renderCellContent = (content: any) => {
    if (content === null || content === undefined) {
      return '';
    }
    if (typeof content === 'object') {
      return JSON.stringify(content);
    }
    return String(content);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={`${rowIndex}-${column}`}>
                {renderCellContent(row[column])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SQLResultTable;