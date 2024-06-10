
-- Function for send event when have employee audit
CREATE OR REPLACE FUNCTION employee_audit_trigger_func()
RETURNS trigger
LANGUAGE plpgsql
AS 
$$
BEGIN
if (TG_OP = 'INSERT') then 
	PERFORM pg_notify('watch_create_event_table_employee', row_to_json(NEW)::text);
	RETURN NEW;
elsif (TG_OP = 'UPDATE') then
	PERFORM pg_notify('watch_update_event_table_employee', row_to_json(NEW)::text);
	RETURN NEW;
elsif (TG_OP = 'DELETE') then
	PERFORM pg_notify('watch_delete_event_table_employee', row_to_json(OLD)::text);
	RETURN OLD;
END IF;
END;
$$;

-- Trigger when have employee audit and call employee_audit_trigger_func()
CREATE TRIGGER employee_audit_trigger 
AFTER INSERT OR UPDATE OR DELETE ON public.employee
FOR EACH ROW EXECUTE FUNCTION employee_audit_trigger_func();
