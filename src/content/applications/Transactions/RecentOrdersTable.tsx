import {
  Box, Card, CardHeader, Checkbox, Divider, FormControl, IconButton, InputLabel, Table,
  TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow, Tooltip, Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React from 'react';
import Label from 'src/components/Label';
import BulkActions from './BulkActions';
import { Customer } from './RecentOrders';

interface RecentOrdersTableProps {
  className?: string;
  customers: Customer[];
  color: string;
}

interface Filters {
  // status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: boolean): JSX.Element => {
  const { text, color } = cryptoOrderStatus
    ? {
        text: 'Failed',
        color: 'error'
      }
    : {
        text: 'Completed',
        color: 'success'
      };

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: Customer[],
  filters: Filters
): Customer[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    // if (filters.status && cryptoOrder.status !== filters.status) {
    //   matches = false;
    // }

    return matches;
  });
};

const applyPagination = (
  customers: Customer[],
  page: number,
  limit: number
): Customer[] => {
  return customers.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ customers }) => {
  const [selectedCustomers, setSelectedCryptoOrders] = useState<number[]>([]);
  const selectedBulkActions = selectedCustomers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    // if (e.target.value !== 'all') {
    //   value = e.target.value;
    // }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    // setSelectedCryptoOrders(
    //   // event.target.checked
    //   //   ? customers.map((cryptoOrder) => cryptoOrder.customer_id)
    //   //   : []
    // );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    customerId: number
  ): void => {
    if (!selectedCustomers.includes(customerId)) {
      // setSelectedCryptoOrders((prevSelected) => [
      //   ...prevSelected,
      //   cryptoOrderId
      // ]);
    } else {
      // setSelectedCryptoOrders((prevSelected) =>
      //   prevSelected.filter((id) => id !== cryptoOrderId)
      // );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCustomers = applyFilters(customers, filters);
  const paginatedCustomers = applyPagination(filteredCustomers, page, limit);
  const selectedSomeCryptoOrders =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCryptoOrders = selectedCustomers.length === customers.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                {/* <Select
                  value={filters.status || 'all'}
                  // onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select> */}
              </FormControl>
            </Box>
          }
          title="Recent Orders"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                hover
                key={customer.customer_id}
                // selected={isCustomerSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    // checked={isCustomerSelected}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      // handleSelectOneCryptoOrder(event, customer.id);
                    }}
                    // value={isCustomerSelected}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {customer.customer_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {customer.fullname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {customer.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {customer.phone}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {customer.address}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {getStatusLabel(customer.active)}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Order" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Order" arrow>
                    <IconButton
                      sx={{
                        '&:hover': { background: theme.colors.error.lighter },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {/* {paginatedCustomers.map((customer) => {
              const isCustomerSelected = selectedCustomers.includes(
                customer.customer_id
              );
              return (
                
              );
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCustomers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

// RecentOrdersTable.propTypes = {
//   customers: PropTypes.array.isRequired
// };

// RecentOrdersTable.defaultProps = {
//   customers: []
// };

export default RecentOrdersTable;
