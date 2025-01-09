import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Link, RelativePathString, router } from "expo-router";
import "@/global.css";
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

type Checked = boolean;

type Store = {
  id: number;
  storeName: string;
  productQuantity: number;
  status: boolean;
  actionUrl: string;
};

const AdminTable = () => {
  const [stores, setStores] = React.useState<Store[]>([
    {
      id: 1,
      storeName: "Jollibee",
      productQuantity: 6,
      status: false,
      actionUrl: "/tabs",
    },
  ]);

  const [position, setPosition] = React.useState("asc");

  const handleStatusChange = (id: number, checked: boolean) => {
    setStores(
      stores.map((store) =>
        store.id === id ? { ...store, status: checked } : store
      )
    );
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
                  value={position}
                  onValueChange={setPosition}
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
              <Button variant="outline" className="w-12 p-2 text-xs">
                Edit
              </Button>
              <Button variant="outline" className="w-12 p-2 text-xs">
                Delete
              </Button>
              <Button variant="outline" className="w-12 p-2 text-xs">
                Add
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[65px]">STORE</TableHead>
                <TableHead className="text-center">PRODUCTS</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>ACTION</TableHead>
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
                  <TableCell>
                    <Button asChild variant={"secondary"}>
                      <Link href={store.actionUrl as RelativePathString}>
                        <SquareArrowOutUpRight />
                      </Link>
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
