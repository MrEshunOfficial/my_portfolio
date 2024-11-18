import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { AppDispatch, RootState } from "@/store";
import { deleteContact, fetchContacts } from "@/store/contactSlice";

const ContactList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, pagination, isLoading, error } = useSelector(
    (state: RootState) => state.contacts
  );

  const [deletePassword, setDeletePassword] = useState("");
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  const handleDeleteContact = () => {
    if (contactToDelete) {
      dispatch(
        deleteContact({
          contactId: contactToDelete,
          password: deletePassword,
        })
      ).then((result) => {
        if (deleteContact.fulfilled.match(result)) {
          toast({
            title: "Success",
            description: "Contact deleted successfully",
            variant: "default",
          });

          // Reset delete state
          setContactToDelete(null);
          setDeletePassword("");
        }
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchContacts(newPage));
  };

  return (
    <Card className="w-full p-0 border-none">
      <CardHeader>
        <CardTitle>Contact Submissions</CardTitle>
      </CardHeader>
      <CardContent className="p-0 border-none">
        {isLoading ? (
          <p className="w-full h-full p-2 flex items-center justify-center">
            Loading contacts...
          </p>
        ) : contacts.length === 0 ? (
          <p className="w-full h-full p-2 flex items-center justify-center">
            No contacts found.
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Text</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="max-w-[5rem] truncate">
                            {contact.name}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sender: {contact.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="max-w-[5rem] truncate">
                            {contact.email}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Email: {contact.email}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="max-w-[5rem] truncate">
                            {contact.description}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Message: {contact.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setContactToDelete(contact._id)}
                          >
                            <Trash2 />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>Enter admin password to delete this message:</p>
                            <Input
                              type="password"
                              placeholder="Enter password"
                              value={deletePassword}
                              onChange={(e) =>
                                setDeletePassword(e.target.value)
                              }
                            />
                            <Button
                              variant="destructive"
                              onClick={handleDeleteContact}
                            >
                              Confirm Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e: { preventDefault: () => void }) => {
                      e.preventDefault();
                      if (pagination.currentPage > 1) {
                        handlePageChange(pagination.currentPage - 1);
                      }
                    }}
                    isActive={pagination.currentPage > 1}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink>
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination.currentPage < pagination.totalPages) {
                        handlePageChange(pagination.currentPage + 1);
                      }
                    }}
                    isActive={pagination.currentPage < pagination.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactList;
