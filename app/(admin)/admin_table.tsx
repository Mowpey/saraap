import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { Link, RelativePathString } from "expo-router";
import "@/global.css";
import { useRouter } from "expo-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SquareArrowOutUpRight } from "lucide-react";
import {
  StoreData,
  getStores,
  updateStoreStatus,
} from "@/services/store/crud_store";
import AddStoreDialog from "@/services/store/add_dialog.tsx";
import EditStoreDialog from "@/services/store/edit_dialog";
import DeleteStoreDialog from "@/services/store/delete_dialog";

type Checked = boolean;

type Store = {
  id: string;
  storeName: string;
  productQuantity: number;
  status: boolean;
  actionUrl: string;
};

const AdminTable = () => {
  const router = useRouter();
  const [stores, setStores] = React.useState<Store[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<StoreData | null>(
    null
  );

  const handleStatusChange = async (id: string, checked: boolean) => {
    try {
      await updateStoreStatus(id, checked);
      setStores(
        stores.map((store) =>
          store.id === id ? { ...store, status: checked } : store
        )
      );
    } catch (error) {
      console.error("Failed to update store status:", error);
    }
  };

  const fetchStores = async (direction: "asc" | "desc") => {
    try {
      setIsLoading(true);
      const storesData = await getStores(direction);
      setStores(storesData);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStores(sortDirection);
  }, [sortDirection]);

  const handleEdit = (store: StoreData) => {
    setSelectedStore(store);
    setIsEditDialogOpen(true);
  };
  const handleDelete = (store: StoreData) => {
    setSelectedStore(store);
    setIsDeleteDialogOpen(true);
  };

  const handleSortChange = (newDirection: string) => {
    setSortDirection(newDirection as "asc" | "desc");
  };

  const handleStoreClick = (storeName: string) => {
    router.push({
      pathname: "/admin_products" as RelativePathString,
      params: { storeName },
    });
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <div className="flex justify-between items-center mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Order By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={sortDirection}
                  onValueChange={handleSortChange}
                >
                  <DropdownMenuRadioItem value="asc">
                    Ascending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc">
                    Descending
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="space-x-1">
              <Button
                className="w-12 p-2 text-xs"
                onClick={() => setIsAddDialogOpen(true)}
              >
                Add
              </Button>
            </div>
          </div>
          <AddStoreDialog
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onStoreAdded={() => fetchStores(sortDirection)}
          />
          <EditStoreDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedStore(null);
            }}
            onStoreEdited={() => fetchStores(sortDirection)}
            store={selectedStore}
          />
          <DeleteStoreDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setIsDeleteDialogOpen(false);
              setSelectedStore(null);
            }}
            onStoreDeleted={() => fetchStores(sortDirection)}
            store={selectedStore}
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[65px]">STORE</TableHead>
                <TableHead className="text-center">PRODUCTS</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-center">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">
                    {store.storeName}
                  </TableCell>
                  <TableCell className="text-center">
                    {store.productQuantity}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`store-${store.id}`}
                        checked={store.status}
                        onCheckedChange={(checked) =>
                          handleStatusChange(store.id, checked)
                        }
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="w-12 p-2 text-xs"
                      onClick={() => handleEdit(store)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-12 p-2 text-xs font-bold"
                      onClick={() => handleDelete(store)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleStoreClick(store.storeName)}
                    >
                      <SquareArrowOutUpRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AdminTable;
